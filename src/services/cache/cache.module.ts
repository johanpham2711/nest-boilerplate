import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { appConfig } from 'src/configs';
import { CacheService } from './cache.service';

@Module({
  imports: [
    NestCacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: appConfig.redisHost,
      port: appConfig.redisPort,
      password: appConfig.redisPassword,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
