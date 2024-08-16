import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategies';
import { appConfig } from 'src/configs';
import { EmailModule } from 'src/services';
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
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
