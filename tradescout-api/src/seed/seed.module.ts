import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../Expense/Expense.entity';
import { Income } from '../Income/Income.entity';
import { User } from '../User/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Income, Expense])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
