import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule, TemplatesModule, UsersModule } from './modules';

@Module({
  imports: [PrismaModule, TemplatesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
