import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser, TypeCurrentUser } from '@app/prisma/user/user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentUser() user: TypeCurrentUser) {
    return this.authService.login(user);
  }
}
