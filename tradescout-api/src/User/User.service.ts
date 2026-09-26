import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './User.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { passwordCheck } from 'src/utils/passwordCheck';
import * as bcrypt from 'bcrypt';
import { CurrentUserType } from 'src/types/currentUser';
import { BusinessService } from 'src/Business/Business.service';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject()
    private readonly businessService: BusinessService,

    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectPinoLogger(UserService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getUser(currentUser: CurrentUserType) {
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

  async registerUser(payload) {
    const { business, ...userDetials } = payload;

    try {
      return await this.dataSource.transaction(async (em) => {
        const hashedPassword = await bcrypt.hash(userDetials.password, 10);
        const user = em.getRepository(User).create({
          ...userDetials,
          password: hashedPassword,
        } as Partial<User>);
        const savedUser = await em.getRepository(User).save(user);

        await this.businessService.createBusiness(
          { ...business, user: savedUser },
          em,
        );

        return await em.getRepository(User).findOne({
          where: { id: savedUser.id },
          relations: {
            businesses: true,
          },
        });
      });
    } catch (error) {
      this.logger.error(`registerUser - failed to create user: ${error}`);
      throw new InternalServerErrorException('Failed to create accoutn');
    }
  }
}
