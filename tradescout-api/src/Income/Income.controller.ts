import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { IncomeService } from './Income.service';
import type { CreateIncomeDto, UpdateIncomeDto } from './Income.dto';
import { JwtAuthGuard } from 'src/Auth/auth.guard';
import { CurrentUser } from 'src/decorator/currentUser.decorator';

@UseGuards(JwtAuthGuard)
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async addIncome(
    @Body() body: CreateIncomeDto,
    @CurrentUser('userId') currentUser: number,
  ) {
    return await this.incomeService.addIncome(currentUser, body);
  }

  @Get()
  async getIncome(@CurrentUser('userId') currentUser: number) {
    return await this.incomeService.getIncome(currentUser);
  }

  @Put()
  async updateIncome(
    @Body() body: UpdateIncomeDto,
    @CurrentUser('userId') currentUser: number,
  ) {
    return await this.incomeService.updateIncome(currentUser, body.id, body);
  }

  @Delete()
  async deleteIncome(
    @Query('id') id: number,
    @CurrentUser('userId') currentUser: number,
  ) {
    return await this.incomeService.deleteIncome(currentUser, id);
  }

  @Get('export')
  async exportCsv(
    @Query('businessId') businessId: string,
    @Query('year') year: string,
    @Query('quarter') quarter: string,
    @Res() res: Response,
  ) {
    const mockUserId = '8f3e2b90-9512-4217-a021-9dfa891e8bc2';
    const csvData = await this.incomeService.exportQuarterlyCsv(
      businessId,
      mockUserId,
      parseInt(year, 10),
      parseInt(quarter, 10),
    );
    res.set('Content-Type', 'text/csv');
    res.set(
      'Content-Disposition',
      `attachment; filename=mtd_income_b2b_${businessId}_q${quarter}_${year}.csv`,
    );

    return res.status(HttpStatus.OK).send(csvData);
  }
}
