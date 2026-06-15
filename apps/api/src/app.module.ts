import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncomeController } from './Income/Income.controller';
import { IncomeModule } from '@tradescout/lib/src/Income/Income.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'Local',
      port: 5432,
      username: 'tradescout',
      password: 'temp_pass',
      autoLoadEntities: true,
      synchronize: true,
    }),
    IncomeModule,
  ],
  controllers: [AppController, IncomeController],
  providers: [AppService],
})
export class AppModule {}
