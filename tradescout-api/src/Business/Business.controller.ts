import { Controller, Get, UseGuards } from '@nestjs/common';
import { BusinessService } from './Business.service';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('/recent')
  async getRecentBusiness(@CurrentUser() currentUser) {
    return await this.businessService.getRecentBusinessTransactions(
      currentUser,
    );
  }
}
