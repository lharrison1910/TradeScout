import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,

    logger: new ConsoleLogger({
      logLevels: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
      json: true,
      colors: true,
    }),
  });

  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useBodyParser('json', {
    limit: '300kb',
  });

  enableSwagger(app);
  const seed = app.get(SeedService);
  await seed.run();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

function enableSwagger(app: NestExpressApplication) {
  const _apiDescription = `
   TradeScout API documentation for internal use.

   TradeScout supports the TradeScout UI only, and is not
   a public API for external clients.
  `;

  const config = new DocumentBuilder()
    .setTitle('TradeScout API')
    .setDescription(_apiDescription)
    .setVersion('1.0')
    .addTag('TradeScout API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);
}
