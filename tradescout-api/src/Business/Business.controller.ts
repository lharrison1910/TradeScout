import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BusinessService } from './Business.service';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('/recent')
  async getRecentBusiness(
    @CurrentUser('userId') currentUser: number,
    @Param('id') businessId: string,
  ) {
    return await this.businessService.getRecentBusinessTransactions(
      currentUser,
      businessId,
    );
  }
}
