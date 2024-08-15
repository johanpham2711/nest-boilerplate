import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './configs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(config.port);
  console.log(`Server is running on ${config.port}`);
}

bootstrap();
