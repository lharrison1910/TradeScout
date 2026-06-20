import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import type { Response } from 'express';
import { ExpenseService } from './Expense.service';
import type { CreateExpenseDto, UpdateExpenseDto } from './Expense.dto';
import { JwtAuthGuard } from 'src/Auth/auth.guard';
import { CurrentUser } from 'src/decorator/currentUser.decorator';

@UseGuards(JwtAuthGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async getExpense(@CurrentUser('userId') currentUser: number) {
    return await this.expenseService.getExpenses(currentUser);
  }

  @Post()
  async addExpense(
    @Body() body: CreateExpenseDto,
    @CurrentUser('userId') currentUser: number,
  ) {
    return await this.expenseService.addExpense(currentUser, body);
  }

  @Put()
  async updateExpense(
    @Body() body: UpdateExpenseDto,
    @CurrentUser('userId') currentUser: number,
  ) {
    return await this.expenseService.updateExpense(currentUser, body);
  }

  @Delete()
  async deleteExpense(
    @Query('id') id: number,
    @CurrentUser('userId') currentUser: number,
  ) {
    return await this.expenseService.deleteExpense(currentUser, id);
  }

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
}
