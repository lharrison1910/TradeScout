import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './Auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

interface LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req: Request) {
    // Passport automatically redirects the user to Google here
  }

  // Step 2: Google redirects back to this route with the user data
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    // 1. req.user contains the data returned by our GoogleStrategy validate() method
    const user = await this.authService.validateGoogleUser(req.user);

    // 2. Generate your standard JWT (reuse your existing logic here)
    const jwtToken = this.authService.generateJwt({
      sub: user.id,
      email: user.email,
    });

    res.cookie('Authentication', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    // 4. Redirect the user back to the React frontend dashboard
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    return res.redirect(`${frontendUrl}/dashboard`);
  }
}
