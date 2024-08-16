import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  PrismaModule,
  TemplatesModule,
  UsersModule,
} from './modules';
import { BullQueueModule, EmailModule } from './services';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    BullQueueModule,
    TemplatesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
