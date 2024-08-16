import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache, Milliseconds } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async set(key: string, value: unknown, ttl?: Milliseconds): Promise<void> {
    await this.cacheService.set(key, value, ttl);
  }

  async get<T = string>(key: string): Promise<string> {
    return this.cacheService.get<T>(key) as unknown as string;
  }

  async delete(key: string): Promise<void> {
    await this.cacheService.del(key);
  }
}
