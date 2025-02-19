import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  PrismaModule,
  SuppliersModule,
  TemplatesModule,
  UsersModule,
} from './modules';
import { BullQueueModule, CacheModule, EmailModule } from './services';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    BullQueueModule,
    CacheModule,
    TemplatesModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    SuppliersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
