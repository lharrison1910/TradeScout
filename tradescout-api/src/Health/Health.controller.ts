import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('health')
export class HealthController {
  @Get()
  healthCheck() {
    return { status: 'Good' };
  }
}
