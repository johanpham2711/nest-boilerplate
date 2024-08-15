import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import {
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
} from './common/filters';
import { TransformInterceptor } from './common/interceptors';
import { CustomValidationPipe } from './common/pipes';
import { appConfig, swaggerConfig } from './configs';
import { swaggerEnvironments } from './constants';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = new Logger('Server');

  // Middlewares
  app.use(cors());
  app.use(morgan('dev'));

  // Global nest setup
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  // Starts listening to shutdown hooks
  app.enableShutdownHooks();

  // Config global prefix
  app.setGlobalPrefix(appConfig.prefix);

  // Swagger
  swaggerEnvironments.includes(appConfig.environment) && swaggerConfig(app);

  await app.listen(appConfig.port, appConfig.host);

  logger.log(`Server is running on ${appConfig.host}:${appConfig.port}`);
}

bootstrap();
