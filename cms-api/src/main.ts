import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationError, ValidationPipe} from '@nestjs/common';
import {ValidationFilter} from './core/filters/validation.filter';
import {ValidationException} from './core/filters/validation.exception';
import {AllExceptionsFilter} from './http-exception.filter';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };
  app.enableCors(options);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useStaticAssets(join(__dirname, '..', 'media-files'), {
    prefix: '/media-files',
  });

  // custom-validation
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe({
    // Make sure that there's no unexpected data
    skipMissingProperties: false,
    skipNullProperties: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    exceptionFactory: (errors: ValidationError[]) => {
      console.log(errors);
      const messages = errors.map((error) => {
        return {
          error: `${error.property} has wrong value ${error.value}.`,
          message: Object.values(error.constraints).join(''),
        }
      });

      return new ValidationException(messages);
    }
  }));
  await app.listen(3000).then();

}

bootstrap();
