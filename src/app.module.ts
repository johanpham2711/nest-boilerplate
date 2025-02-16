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

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    BullQueueModule,
    CacheModule,
    TemplatesModule,
    AuthModule,
    UsersModule,
    SuppliersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
