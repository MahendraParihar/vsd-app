/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Env, ValidationFilter } from '@server/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const globalPrefix = 'api/mandal';
  app.use(urlencoded({ extended: true, limit: '50mb' }));


  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      forbidUnknownValues: false,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ValidationFilter());
  app.use(json({ limit: '50mb' }));
  app.setGlobalPrefix(globalPrefix);
  const port = Env.apiPort || 3335;
  app.enableShutdownHooks();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
