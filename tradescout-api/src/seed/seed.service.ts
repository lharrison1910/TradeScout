import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Expense } from '../Expense/Expense.entity';
import { Income } from '../Income/Income.entity';
import { User } from '../User/User.entity';
import { DataSource, Repository } from 'typeorm';
import { generateMockUsers } from './mockUsers';
import { mockIncomeData } from './mockIncome';
import { mockExpenseData } from './mockExpense';
import { Business } from 'src/Business/Business.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectDataSource()
    private readonly datasource: DataSource,

    @InjectPinoLogger(SeedService.name)
    private readonly logger: PinoLogger,
  ) {}

  async run() {
    const users = await this.userRepo.find();

    if (users.length === 0) {
      await this._seedDb();
    } else {
      this.logger.warn('Db not empty');
    }
  }

  async _seedDb() {
    try {
      this.logger.info('Starting seed');
      const mockedUsers = await generateMockUsers();
      await this.datasource.transaction(async (em) => {
        const userRepository = em.getRepository(User);
        const incomeRepository = em.getRepository(Income);
        const expenseRepository = em.getRepository(Expense);
        const businessRepository = em.getRepository(Business);

        const usersToSave = userRepository.create(mockedUsers);
        const users = await userRepository.save(usersToSave);
        this.logger.info('Saved users');

        const incomeWithUser = mockIncomeData.map((income) => {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          return {
            ...income,
            userId: randomUser.id,
          };
        });
        const incomeToSave = incomeRepository.create(incomeWithUser);
        await incomeRepository.save(incomeToSave);
        this.logger.info('Saved income');

        const expenseWithUser = mockExpenseData.map((expense) => {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          return {
            ...expense,
            receiptImageUrl: expense.receiptImageUrl ?? undefined,
            userId: randomUser.id,
          };
        });
        const expenseToSave = expenseRepository.create(expenseWithUser);
        await expenseRepository.save(expenseToSave);
        this.logger.info('Saved expense');
      });
      this.logger.info('Successfully seeded');
    } catch (error) {
      this.logger.error(`Failed to seed db: ${error}`);
    }
  }
}
