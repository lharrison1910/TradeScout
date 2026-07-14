import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './Business.entity';
import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  async getBusiness(currentUser: number, businessId?: string) {
    let business: Business | Business[] | null;
    const findOptions = { userId: currentUser };
    if (businessId) {
      findOptions['id'] = businessId;
    }
    try {
      business = await this.businessRepository.find({
        where: findOptions,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to fetch businesses');
    }

    if (!business) {
      throw new NotFoundException('No business was found');
    }

    return business;
  }

  async getRecentBusinessTransactions(currentUser: number, businessId: string) {
    const business = await this.businessRepository.find({
      where: { id: businessId, userId: currentUser },
      relations: {
        income: true,
        expense: true,
      },
    });

    if (!business) {
      throw new NotFoundException('Business data could not be found.');
    }

    // .createQueryBuilder('business')
    // .leftJoinAndSelect('business.income', 'income')
    // .leftJoinAndSelect('business.expense', 'expense')
    // .where('business.id = :businessId', { businessId })
    // .andWhere('business.userId = :userId', { userId })
    // .orderBy('COALESCE(income.updatedAt, income.createdAt)', 'DESC')
    // .addOrderBy('COALESCE(expense.updatedAt, expense.createdAt)', 'DESC')
    // .getOne();

    console.log(business, 'business response');

    return business;
  }

  async addBusiness(currentUser: number, payload: Partial<Business>) {
    try {
      const businessToSave = this.businessRepository.create({
        ...payload,
        userId: currentUser,
      });
      const business = await this.businessRepository.save(businessToSave);

      return business;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to save business');
    }
  }
}
