import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  PrismaModule,
  TemplatesModule,
  UsersModule,
} from './modules';
import { BullQueueModule, EmailModule, RedisCacheModule } from './services';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    BullQueueModule,
    RedisCacheModule,
    TemplatesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
