import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EncryptHelper } from 'src/utils';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    await this.$connect();

    // Add Prisma middleware for password hashing
    this.$use(async (params, next) => {
      if (
        params.model === 'User' &&
        (params.action === 'create' || params.action === 'update')
      ) {
        if (params.args.data.password) {
          params.args.data.password = EncryptHelper.hash(
            params.args.data.password,
          );
        }
      }
      return next(params);
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
