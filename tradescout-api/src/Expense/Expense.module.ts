import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './Expense.entity';
import { ExpenseService } from './Expense.service';
import { ExpenseController } from './Expense.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpenseService],
  controllers: [ExpenseController],
  exports: [ExpenseService],
})
export class ExpenseModule {}
