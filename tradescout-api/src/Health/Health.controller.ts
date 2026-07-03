import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorator/currentUser.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('health')
export class HealthController {
  @Get()
  healthCheck(@CurrentUser() user: any) {
    console.log(user, 'user data');
    return { status: 'Good' };
  }
}
