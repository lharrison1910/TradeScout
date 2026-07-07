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
import { Business } from '../Business/Business.entity';
import { mockBusiness } from './mockBusiness';

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

        this.logger.info('starting users');
        const usersToSave = userRepository.create(mockedUsers);
        const users = await userRepository.save(usersToSave);
        this.logger.info('Saved users');

        this.logger.info('starting businesses');
        const businessWithUser = mockBusiness.map((business) => {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          return { ...business, user: randomUser };
        });
        const businessToSave = businessRepository.create(businessWithUser);
        const businesses = await businessRepository.save(businessToSave);
        this.logger.info('business saved');

        this.logger.info('starting income');
        const incomeWithUser = mockIncomeData.map((income) => {
          const randomBusiness =
            businesses[Math.floor(Math.random() * businesses.length)];
          return {
            ...income,
            userId: randomBusiness.userId,
            businessId: randomBusiness.id,
          };
        });
        const incomeToSave = incomeRepository.create(incomeWithUser);
        await incomeRepository.save(incomeToSave);
        this.logger.info('Saved income');

        this.logger.info('starting expense');
        const expenseWithUser = mockExpenseData.map((expense) => {
          const randomBusiness =
            businesses[Math.floor(Math.random() * businesses.length)];
          return {
            ...expense,
            receiptImageUrl: expense.receiptImageUrl ?? undefined,
            userId: randomBusiness.user.id,
            businessId: randomBusiness.id,
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
