import { swaggerEnvironments } from '@common/constants';
import {
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
} from '@common/filters';
import { TransformInterceptor } from '@common/interceptors';
import { CustomValidationPipe } from '@common/pipes';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { useContainer } from 'class-validator';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { appConfig, swaggerConfig } from './configs';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

async function bootstrap(): Promise<unknown> {
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

  await app.init();

  logger.log(`Serverless is running`);

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: unknown,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
