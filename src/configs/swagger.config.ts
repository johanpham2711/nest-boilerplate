import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './app.config';

export const swaggerConfig = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('NestJS Boilerplate API')
    .setDescription('NestJS Boilerplate API documentation!')
    .setVersion(appConfig.version)
    .addBearerAuth()
    .addTag('app', 'App API')
    .addTag('auth', 'Auth API')
    .addTag('users', 'Users API')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
