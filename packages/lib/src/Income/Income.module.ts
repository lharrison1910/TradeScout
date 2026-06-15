import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Income } from "./Income.entity";
import { IncomeService } from "./Income.service";

@Module({
  imports: [TypeOrmModule.forFeature([Income])],
  providers: [IncomeService],
  exports: [IncomeService],
})
export class IncomeModule {}
