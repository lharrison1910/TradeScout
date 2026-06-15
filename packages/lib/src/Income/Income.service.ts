import { Repository } from "typeorm";
import { Income } from "./Income.entity";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../User/User.entity";

@Injectable()
export class IncomeService {
  private readonly logger = new Logger(IncomeService.name);

  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
  ) {}

  async getAllIcome(currentUser: User) {
    let income: Income[];

    try {
      income = await this.incomeRepository.find({
        where: { user: currentUser },
      });
    } catch (err) {
      this.logger.error(`getAllIncome: ${err}`);
      throw new InternalServerErrorException("Failed to fetch income records");
    }

    return income;
  }

  async addIncome(payload) {
    const income = this.incomeRepository.create(payload);

    try {
      return await this.incomeRepository.save(income);
    } catch (err) {
      this.logger.error(`addIncome: ${err}`);
      throw new InternalServerErrorException("Failed to save new income");
    }
  }

  async updateIncome(payload) {}

  async deleteIncome(id: number) {
    try {
      const deleted = await this.incomeRepository.delete(id);

      if(!deleted.affected || deleted.affected < 1){
        throw  new BadRequestException(`No income found with id: ${id}`);
      }



      return deleted.affected;
    } catch (err) {
      if (err instanceof BadRequestException) {
        this.logger.error(`deleteIncome: No income found - ${err}`);
        throw err;
      }

      this.logger.error(`deleteIncome: ${err}`);
      throw new InternalServerErrorException("Failed to delete");
    }
  }
}
