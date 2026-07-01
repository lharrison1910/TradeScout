import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './Income.entity';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateIncomeDto, UpdateIncomeDto } from './Income.dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,

    @InjectPinoLogger(IncomeService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getIncome(currentUser: number) {
    let income: Income[];
    try {
      income = await this.incomeRepository.find({
        where: { userId: currentUser },
      });
    } catch (error) {
      this.logger.error(`getIncome - failed to get income: ${error}`);
      throw new InternalServerErrorException('Failed to get income');
    }

    if (income.length === 0) {
      throw new NotFoundException('No income were found');
    }

    return income;
  }

  async addIncome(currentUser: number, payload) {
    console.log(payload, 'this is the payload');
    const income = this.incomeRepository.create({
      userId: currentUser,
      ...payload,
    });

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

// async addIncome(currentUser: number, payload) {
//   console.log(payload, 'this is the payload');
//   // const income = this.incomeRepository.create({
//   //   userId: currentUser,
//   //   ...payload,
//   // });

//   // try {
//   //   return await this.incomeRepository.save(income);
//   // } catch (error) {
//   //   this.logger.error(`addIncome: ${error}`);
//   //   throw new InternalServerErrorException('Failed to save income');
//   // }
// }

// //TODO: add filters for year/date/any search functionality
//

// async updateIncome(
//   currentUser: number,
//   incomeId: number,
//   payload: UpdateIncomeDto,
// ) {
//   let income: Income | null;

//   try {
//     income = await this.incomeRepository.findOne({
//       where: { userId: currentUser, id: incomeId },
//     });
//   } catch (error) {
//     this.logger.error(
//       `updateIncome - faied to get income ${incomeId}: ${error}`,
//     );
//     throw new InternalServerErrorException(
//       `Failed to update Income ${incomeId}`,
//     );
//   }

//   if (!income) {
//     throw new NotFoundException(`Income ${incomeId} was not found`);
//   }

//   try {
//     const updatedIncome = await this.incomeRepository.update(
//       incomeId,
//       payload,
//     );
//     return updatedIncome.affected;
//   } catch (error) {
//     this.logger.error(
//       `updateIncome - failed to update income ${incomeId}: ${error}`,
//     );
//     throw new InternalServerErrorException('Failed to update income');
//   }
// }

// async deleteIncome(currentUser: number, id: number) {
//   let income: Income | null;

//   try {
//     income = await this.incomeRepository.findOne({
//       where: { id, userId: currentUser },
//     });
//   } catch (error) {
//     this.logger.error(
//       `deleteIncome - failed to find ${id} to delete: ${error}`,
//     );
//     throw new InternalServerErrorException('Failed to find record to delete');
//   }

//   if (!income) {
//     throw new NotFoundException(`Failed to find ${id} to delete`);
//   }

//   try {
//     const deleted = await this.incomeRepository.softDelete(id);
//     return deleted.affected;
//   } catch (error) {
//     this.logger.error(`deleteIncome - failed to soft delete ${id}: ${error}`);
//     throw new InternalServerErrorException('Failed to delete Income');
//   }
// }
