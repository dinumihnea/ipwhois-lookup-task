import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { IpwhoisResponse } from '../ipwhois/interfaces/ipwhois.response';

const IP_CACHE_TTL_SECONDS = 60;

@Injectable()
export class IpCacheService {
  constructor(private readonly redisService: RedisService) {}

  async cacheIpData(ip: string, ipData: IpwhoisResponse): Promise<void> {
    await this.redisService.set(ip, ipData, IP_CACHE_TTL_SECONDS);
  }

  async getCachedIpData(ip: string): Promise<IpwhoisResponse | null> {
    return this.redisService.get(ip);
  }

  async removeCachedIp(ip: string): Promise<void> {
    await this.redisService.remove(ip);
  }
}
