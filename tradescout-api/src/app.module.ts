import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './Auth/Auth.module';
import { SeedModule } from './seed/seed.module';
import { HealthModule } from './Health/Health.module';
import { BuisnessModule } from './Business/Business.module';
import { UserModule } from './User/User.module';
import { InvoiceModule } from './Invoice/Invoice.module';
import { RefreshTokenModule } from './RefreshToken/refreshToken.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT')
          ? Number(configService.get('DB_PORT'))
          : 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    // IncomeModule,
    // ExpenseModule,
    AuthModule,
    SeedModule,
    HealthModule,
    BuisnessModule,
    UserModule,
    InvoiceModule,
    RefreshTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
