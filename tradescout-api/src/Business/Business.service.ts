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

  async getBusiness(currentUser, businessId?: string) {
    let business: Business | Business[] | null;
    const findOptions = { userId: currentUser.userId };
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

  async addBusiness(currentUser, payload) {
    try {
      const businessToSave = this.businessRepository.create({
        ...payload,
        userId: currentUser.userId,
      });
      const business = await this.businessRepository.save(businessToSave);

      return business;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to save business');
    }
  }
}
