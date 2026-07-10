import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { passwordCheck } from 'src/utils/passwordCheck';
import * as bcrypt from 'bcrypt';

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

  async updatePassword(currentUser, newPassword) {
    let user: User | null;

    try {
      user = await this.userRepository.findOne({
        where: { id: currentUser.userId },
      });
    } catch (error) {
      this.logger.error(`updatePassword: failed to fetch user - ${error}`);
      throw new InternalServerErrorException('Something went wrong');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!passwordCheck(newPassword)) {
      throw new BadRequestException('Invalid password');
    }
    try {
      user.password = await bcrypt.hash(newPassword, 10);
      await this.userRepository.update(user.id, user);
    } catch (error) {
      this.logger.error(`updatePassword: failed to update password - ${error}`);
      throw new InternalServerErrorException('Failed to update passwrd');
    }
  }

  async updateAccountDetails(currentUser, payload) {
    let user: User | null;

    try {
      user = await this.userRepository.findOne({ where: { id: payload.id } });
    } catch (error) {
      this.logger.error(
        `updateAccountDetails: failed to fetch user - ${error}`,
      );
      throw new InternalServerErrorException(
        'Failed to update account details',
      );
    }

    if (!user) {
      throw new NotFoundException('No user found');
    }

    if (user.id !== currentUser.userId) {
      throw new UnauthorizedException('Not allowed to edit this account');
    }

    try {
      const updatedUser = { ...user, name: payload.name, email: payload.email };
      await this.userRepository.update(currentUser.userId, updatedUser);
    } catch (error) {
      this.logger.error(
        `updateAccountDetails: Failed to update account(${currentUser.userId}) - ${error}`,
      );
      throw new InternalServerErrorException('Failed to update detail');
    }
  }
}
