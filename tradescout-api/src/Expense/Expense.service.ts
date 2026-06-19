import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './Expense.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateExpenseDto } from './Expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,

    @InjectPinoLogger(ExpenseService.name)
    private readonly logger: PinoLogger,
  ) {}

  async exportQuarterlyCsv(
    businessId: string,
    userId: number,
    year: number,
    quarter: number,
  ): Promise<string> {
    let startDate: string;
    let endDate: string;

    switch (quarter) {
      case 1:
        startDate = `${year}-01-01`;
        endDate = `${year}-03-31`;
        break;
      case 2:
        startDate = `${year}-04-01`;
        endDate = `${year}-06-30`;
        break;
      case 3:
        startDate = `${year}-07-01`;
        endDate = `${year}-09-30`;
        break;
      case 4:
        startDate = `${year}-10-01`;
        endDate = `${year}-12-31`;
        break;
      default:
        throw new NotFoundException('Invalid quarter requested.');
    }

    const records = await this.expenseRepository
      .createQueryBuilder('expense')
      .where('expense.businessId = :businessId', { businessId })
      .andWhere('expense.userId = :userId', { userId })
      .andWhere('expense.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .orderBy('expense.date', 'ASC')
      .getMany();

    const csvRows = [
      'Record ID,Tax Date,Amount (£),HMRC Category,Is Mileage Claim,Is Capital Asset,Description,Receipt URL',
    ];

    for (const record of records) {
      const safeDescription = record.description
        ? record.description.replace(/,/g, '').replace(/\n/g, ' ')
        : '';

      const safeReceiptUrl = record.receiptImageUrl || 'No Receipt Attached';

      csvRows.push(
        `"${record.id}","${record.datePaid}","${record.amount}","${record.category}","${record.isMileageClaim ? 'YES' : 'NO'}","${record.isCapitalAsset ? 'YES' : 'NO'}","${safeDescription}","${safeReceiptUrl}"`,
      );
    }

    return csvRows.join('\n');
  }

  async addExpense(currentUser: number, payload: CreateExpenseDto) {
    const expense = this.expenseRepository.create({
      userId: currentUser,
      ...payload,
    });

    try {
      return await this.expenseRepository.save(expense);
    } catch (error) {
      this.logger.error(`addExpense: ${error}`);
      throw new InternalServerErrorException('Failed to save expense');
    }
  }

  async getExpenses(currentUser: number) {
    let expenses: Expense[];
    try {
      expenses = await this.expenseRepository.find({
        where: { userId: currentUser },
      });
    } catch (error) {
      this.logger.error(`getExpenses - failed to get expenses: ${error}`);
      throw new InternalServerErrorException('Failed to get expenses');
    }

    if (expenses.length === 0) {
      throw new NotFoundException('No expenses were found');
    }

    return expenses;
  }
}
