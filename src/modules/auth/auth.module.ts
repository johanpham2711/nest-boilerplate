import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategies';
import { appConfig } from 'src/configs';
import { QUEUE } from 'src/constants';
import { BullQueueProcessor, CacheModule } from 'src/services';
import { UsersModule } from '../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: appConfig.jwtSecret,
      signOptions: { expiresIn: appConfig.jwtExpiresIn },
    }),
    BullModule.registerQueue({
      name: QUEUE.EMAIL_QUEUE,
    }),
    BullBoardModule.forFeature({
      name: QUEUE.EMAIL_QUEUE,
      adapter: BullMQAdapter,
    }),
    CacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BullQueueProcessor],
})
export class AuthModule {}
