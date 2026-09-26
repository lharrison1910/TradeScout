import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from "./refreshToken.entity";


@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
})
export class RefreshTokenModule {}