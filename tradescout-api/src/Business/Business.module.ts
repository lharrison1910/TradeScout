import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './Business.entity';
import { BusinessService } from './Business.service';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  providers: [BusinessService],
  exports: [BusinessService],
})
export class BuisnessModule {}
