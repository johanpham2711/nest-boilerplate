import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { SuppliersController } from './suppliers.controller';
import { SuppliersRepository } from './suppliers.repository';
import { SuppliersService } from './suppliers.service';

@Module({
  imports: [PrismaModule],
  controllers: [SuppliersController],
  providers: [SuppliersService, SuppliersRepository],
})
export class SuppliersModule {}
