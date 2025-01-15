import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  constructor(private readonly redis: Redis) {}

  public onApplicationShutdown() {
    this.redis.disconnect();
  }

  public async set<T = unknown>(
    key: string,
    value: T,
    ttl: number, // seconds
  ): Promise<boolean> {
    const payload = JSON.stringify(value);

    if (!payload) {
      return false;
    }
    const result = await this.redis.setex(key, ttl, payload);

    return result === 'OK';
  }

  public async get<T = unknown>(key: string): Promise<T | null> {
    const cachedValue = await this.redis.get(key);

    if (!cachedValue) return null;

    return JSON.parse(cachedValue) as T | null;
  }

  public async remove(key: string): Promise<boolean> {
    const result = await this.redis.del(key);

    return result > 0;
  }
}
