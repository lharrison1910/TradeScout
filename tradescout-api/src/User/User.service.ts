import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectPinoLogger(UserService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getUser(currentUser) {
    let user: User | null;

    try {
      user = await this.userRepository.findOne({
        where: { id: currentUser.userId },
        relations: { businesses: true },
      });
    } catch (error) {
      this.logger.error(`getUser: failed to get user - ${error}`);
      throw new InternalServerErrorException('Something went wrong');
    }

    if (!user) {
      this.logger.error('getUser: No user found');
      throw new NotFoundException('No user found');
    }

    return user;
  }
}
