import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthService } from './Auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/User/User.entity';
import { AuthController } from './Auth.controller';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { UserModule } from 'src/User/User.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
