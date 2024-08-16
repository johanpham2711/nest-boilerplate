import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  PrismaModule,
  TemplatesModule,
  UsersModule,
} from './modules';
import { EmailModule } from './services';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    TemplatesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
