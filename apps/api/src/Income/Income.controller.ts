import { Body, Controller, Post } from '@nestjs/common';
import { IncomeService } from '@tradescout/lib/src/Income/Income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async addIncome(@Body() body) {
    console.log(body);
    return await this.incomeService.addIncome(body);
  }
}
