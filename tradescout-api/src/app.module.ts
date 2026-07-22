import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeModule } from './Income/Income.module';
import { ExpenseModule } from './Expense/Expense.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/Auth.module';
import { SeedModule } from './seed/seed.module';
import { HealthModule } from './Health/Health.module';
import { BuisnessModule } from './Business/Business.module';
import { UserModule } from './User/User.module';
import { InvoiceModule } from './Invoice/Invoice.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tradescout',
      password: 'temp_pass',
      database: 'Local',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IncomeModule,
    ExpenseModule,
    AuthModule,
    SeedModule,
    HealthModule,
    BuisnessModule,
    UserModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
