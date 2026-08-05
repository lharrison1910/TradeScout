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
import { Invoice } from 'src/Invoice/Invoice.entity';
import { mockInvoiceSeeds } from './mokcInvoice';

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
        const invoiceRepository = em.getRepository(Invoice);

        // 1. SEED USERS
        this.logger.info('starting users');
        const usersToSave = userRepository.create(mockedUsers);
        const users = await userRepository.save(usersToSave);
        this.logger.info('Saved users');

        // 2. SEED BUSINESSES
        this.logger.info('starting businesses');
        const businessWithUser = mockBusiness.map((business) => {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          return { ...business, user: randomUser };
        });
        const businessToSave = businessRepository.create(businessWithUser);
        const businesses = await businessRepository.save(businessToSave);
        this.logger.info('business saved');

        // 3. SEED INVOICES (New!)
        this.logger.info('starting invoices');
        const invoicesWithBusiness = mockInvoiceSeeds.map((invoice) => {
          const randomBusiness = businesses[Math.floor(Math.random() * businesses.length)];
          return { 
            ...invoice, 
            business: randomBusiness, // Links the relation
            businessId: randomBusiness.id // Sets the explicit column if required
          };
        });
        const invoicesToSave = invoiceRepository.create(invoicesWithBusiness);
        const invoices = await invoiceRepository.save(invoicesToSave);
        this.logger.info('Saved invoices');

        // 4. SEED INCOME (Updated to link to Invoices)
        this.logger.info('starting income');
        const incomeWithUser = mockIncomeData.map((income) => {
          // Grab a random invoice instead of a random business directly
          const randomInvoice = invoices[Math.floor(Math.random() * invoices.length)];
          
          return {
            ...income,
            // Keep data integrity by matching the invoice's business and user
            userId: randomInvoice.business.user.id, 
            businessId: randomInvoice.business.id,
            invoice: randomInvoice, // Links this income to the invoice
          };
        });
        const incomeToSave = incomeRepository.create(incomeWithUser);
        await incomeRepository.save(incomeToSave);
        this.logger.info('Saved income');

        // 5. SEED EXPENSES (Updated to link to Invoices)
        this.logger.info('starting expense');
        const expenseWithUser = mockExpenseData.map((expense) => {
          // Grab a random invoice to link the expense against
          const randomInvoice = invoices[Math.floor(Math.random() * invoices.length)];

          return {
            ...expense,
            receiptImageUrl: expense.receiptImageUrl ?? undefined,
            // Keep data integrity by matching the invoice's business and user
            userId: randomInvoice.business.user.id,
            businessId: randomInvoice.business.id,
            invoice: randomInvoice, // Links this expense to the invoice
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
