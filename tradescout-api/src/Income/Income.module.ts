import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './Income.entity';
import { IncomeService } from './Income.service';
import { IncomeController } from './Income.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Income])],
  providers: [IncomeService],
  controllers: [IncomeController],
  exports: [IncomeService],
})
export class IncomeModule {}
