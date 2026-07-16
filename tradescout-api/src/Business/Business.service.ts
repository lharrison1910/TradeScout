import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Business } from './Business.entity';
import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Income } from '../Income/Income.entity';
import { Expense } from 'src/Expense/Expense.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,

    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectPinoLogger(BusinessService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getBusiness(currentUser: number, businessId?: string) {
    let business: Business | Business[] | null;
    const findOptions = { userId: currentUser };
    if (businessId) {
      findOptions['id'] = businessId;
    }
    try {
      business = await this.businessRepository.find({
        where: findOptions,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to fetch businesses');
    }

    if (!business) {
      throw new NotFoundException('No business was found');
    }

    return business;
  }

  async getRecentBusinessTransactions(currentUser: number, businessId: string) {
    try {
      const business = await this.businessRepository.find({
        where: { id: businessId, userId: currentUser },
      });

      if (!business) {
        this.logger.error(`getRecentBusinessTransactions: No business found`);
        throw new NotFoundException('Business data could not be found.');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(
        `getRecentBusinessTransactions: Failed to fetch business - ${error}`,
      );
      throw new InternalServerErrorException(
        'Failed to find recent transactions',
      );
    }
    try {
      return await this.dataSource.transaction(async (em) => {
        const incomeRepo = em.getRepository(Income);
        const expenseRepo = em.getRepository(Expense);

        const latestIncome = await incomeRepo
          .createQueryBuilder('income')
          .where('income.businessId = :businessId', { businessId })
          .orderBy('COALESCE(income.updatedAt, income.createdAt)', 'DESC')
          .take(2)
          .getMany();

        const latestExpense = await expenseRepo
          .createQueryBuilder('expense')
          .where('expense.businessId = :businessId', { businessId })
          .orderBy('COALESCE(expense.updatedAt, expense.createdAt)', 'DESC')
          .take(2)
          .getMany();

        const formattedIncomes = latestIncome.map((item) => ({
          ...item,
          type: 'income',
          resolvedDate: item.updatedAt ?? item.createdAt,
        }));

        const formattedExpenses = latestExpense.map((item) => ({
          ...item,
          type: 'expense',
          resolvedDate: item.updatedAt ?? item.createdAt,
        }));

        const combinedTransactions = [
          ...formattedIncomes,
          ...formattedExpenses,
        ].sort((a, b) => {
          const dateA = new Date(a.resolvedDate).getTime();
          const dateB = new Date(b.resolvedDate).getTime();
          return dateB - dateA;
        });

        return combinedTransactions;
      });
    } catch (error) {
      this.logger.error(
        `getRecentBusinessTransactions: Error getting recent transactions - ${error}`,
      );
      throw new InternalServerErrorException(
        'Error getting recent transaction',
      );
    }
  }

  async addBusiness(currentUser: number, payload: Partial<Business>) {
    try {
      const businessToSave = this.businessRepository.create({
        ...payload,
        userId: currentUser,
      });
      const business = await this.businessRepository.save(businessToSave);

      return business;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to save business');
    }
  }
}
