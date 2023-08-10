import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';

export type TypeCurrentUser = Omit<User, 'password'>;

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: TypeCurrentUser = request.user;

    return user;
  },
);
