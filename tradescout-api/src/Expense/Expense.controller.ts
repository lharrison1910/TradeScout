import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ExpenseService } from './Expense.service';
import type { CreateExpenseDto } from './Expense.dto';
import { JwtAuthGuard } from 'src/Auth/auth.guard';
import { CurrentUser } from 'src/decorator/currentUser.decorator';

@UseGuards(JwtAuthGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('export')
  async exportCsv(
    @Query('businessId') businessId: string,
    @Query('year') year: string,
    @Query('quarter') quarter: string,
    @CurrentUser('userId') userId: number,
    @Res() res: Response,
  ) {
    const csvData = await this.expenseService.exportQuarterlyCsv(
      businessId,
      userId,
      Number(year),
      Number(quarter),
    );

    res.set('Content-Type', 'text/csv');
    res.set(
      'Content-Disposition',
      `attachment; filename=mtd_expense_b2b_${businessId}_q${quarter}_${year}.csv`,
    );

    return res.status(HttpStatus.OK).send(csvData);
  }

  @Post()
  async addExpense(@Body() body: CreateExpenseDto) {
    return await this.expenseService.addExpense('', body);
  }
}
