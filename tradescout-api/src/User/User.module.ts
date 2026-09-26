import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './User.service';
import { User } from './User.entity';
import { UserController } from './User.controller';
import { BuisnessModule } from 'src/Business/Business.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BuisnessModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
