/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Env, ValidationFilter } from '@server/common';
import { json, urlencoded } from 'express';
import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const globalPrefix = 'api/core';
  console.log(join(__dirname, '../../../apps/main/src', 'assets'));
  app.useStaticAssets(join(__dirname, '../../../apps/main/src', 'assets'));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      forbidUnknownValues: false,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(json({ limit: '50mb' }));
  app.useGlobalFilters(new ValidationFilter());
  app.setGlobalPrefix(globalPrefix);
  const port = Env.apiPort || 3330;
  app.enableShutdownHooks();
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
