import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './Business.entity';
import { BusinessService } from './Business.service';
import { BusinessController } from './Business.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  providers: [BusinessService],
  exports: [BusinessService],
  controllers: [BusinessController],
})
export class BuisnessModule {}
