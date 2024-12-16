import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  PrismaModule,
  StreamModule,
  TemplatesModule,
  UsersModule,
} from './modules';

@Module({
  imports: [PrismaModule, TemplatesModule, UsersModule, StreamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
