import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { AUTH_MESSAGE } from 'src/messages';
import { ErrorHelper } from 'src/utils';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      const isBlacklisted = await this.cacheService.get<string>(token);
      if (isBlacklisted) {
        ErrorHelper.UnauthorizedException(AUTH_MESSAGE.UNAUTHORIZED);
      }
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
