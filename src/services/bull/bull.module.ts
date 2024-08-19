import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { appConfig } from 'src/configs';
import { EmailModule } from '../email';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: appConfig.redisHost,
          port: appConfig.redisPort,
          password: appConfig.redisPassword,
          // db: appConfig.redisDB,
          // keyPrefix: appConfig.redisKeyPrefix,
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: true,
          attempts: 3,
          backoff: 3000,
          // delay: 1000,
          stackTraceLimit: 10,
        },
        //   prefix: appConfig.redisKeyPrefix,
      }),
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    EmailModule,
  ],
})
export class BullQueueModule {}
