import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { TemplatesController } from './templates.controller';
import { TemplatesRepository } from './templates.repository';
import { TemplatesService } from './templates.service';

@Module({
  imports: [PrismaModule],
  controllers: [TemplatesController],
  providers: [TemplatesService, TemplatesRepository],
})
export class TemplatesModule {}
