//src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appConfig } from 'src/configs';
import { AUTH_MESSAGE } from 'src/messages';
import { UsersService } from 'src/modules/users';
import { ErrorHelper } from 'src/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.jwtSecret,
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    const user = await this.usersService.getUserById(payload.id);

    if (!user) {
      ErrorHelper.UnauthorizedException(AUTH_MESSAGE.UNAUTHORIZED);
    }

    return user;
  }
}
