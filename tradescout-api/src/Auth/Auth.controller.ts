import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './Auth.service';

interface LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    const { user, token } = response;

    res.cookie('Authentication', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return { message: 'Logged out successfully' };
  }
}
