import { Injectable } from '@nestjs/common';
import { IpCacheService } from './ip-cache.service';
import { IpRepository } from './ip.repository';

@Injectable()
export class IpCleanupService {
  constructor(
    private readonly ipCacheService: IpCacheService,
    private readonly ipRepository: IpRepository,
  ) {}

  /**
   * Cleans up IP data into Redis cache, DB and if that was previously stored
   */
  async removeStoredIpData(ip: string): Promise<void> {
    await this.ipCacheService.removeCachedIp(ip);
    await this.ipRepository.remove(ip);
  }
}
