import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig, swaggerConfig } from './configs';
import { swaggerEnvironments } from './constants';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Server');

  swaggerEnvironments.includes(appConfig.environment) && swaggerConfig(app);

  await app.listen(appConfig.port, appConfig.host);

  logger.log(`Server is running on ${appConfig.host}:${appConfig.port}`);
}

bootstrap();
