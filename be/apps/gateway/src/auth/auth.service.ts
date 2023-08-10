import { TypeCurrentUser } from '@app/prisma/user/user.decorator';
import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import {
  TimeoutError,
  catchError,
  lastValueFrom,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientGrpcProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await lastValueFrom<User>(
      this.client.send({ cmd: 'get' }, { email }).pipe(
        timeout(10000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            return throwError(() => new RequestTimeoutException());
          }
          return throwError(() => err);
        }),
      ),
    );

    if (compareSync(password, user?.password)) {
      delete user.password;
      return user as TypeCurrentUser;
    }

    return null;
  }

  async login(user: TypeCurrentUser) {
    const payload = { user, sub: user.id };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
