import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './Income.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateIncomeDto } from './Income.dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,

    @InjectPinoLogger(IncomeService.name)
    private readonly logger: PinoLogger,
  ) {}

  async addIncome(user: string, payload: CreateIncomeDto): Promise<Income> {
    const income = this.incomeRepository.create({ userId: user, ...payload });

    try {
      return await this.incomeRepository.save(income);
    } catch (error) {
      this.logger.error(`addIncome: ${error}`);
      throw new InternalServerErrorException('Failed to save income');
    }
  }

  async exportQuarterlyCsv(
    businessId: string,
    userId: string,
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
        throw new NotFoundException('Invalid quarter requested (1-4).');
    }

    const records = await this.incomeRepository
      .createQueryBuilder('income')
      .where('income.businessId = :businessId', { businessId })
      .andWhere('income.userId = :userId', { userId })
      .andWhere('income.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    const csvRows: string[] = [];
    csvRows.push('ID,Tax Date,Amount,Category,Daily Total Reference,User Note');

    for (const record of records) {
      csvRows.push(
        `"${record.id}","${record.dateReceived}","${record.amount}","${record.category}","${record.isDailyTotal}","${record.reference || ''}"`,
      );
    }

    return csvRows.join('\n');
  }
}
