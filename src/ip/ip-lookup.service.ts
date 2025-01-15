import { Injectable } from '@nestjs/common';
import { IpwhoisConsumerService } from '../ipwhois/ipwhois-consumer.service';
import { IpLookupDto } from './dto/ip-lookup.dto';
import { IpCacheService } from './ip-cache.service';
import { IpRepository } from './ip.repository';
import { IpwhoisResponse } from '../ipwhois/interfaces/ipwhois.response';

@Injectable()
export class IpLookupService {
  constructor(
    private readonly ipwhoisConsumerService: IpwhoisConsumerService,
    private readonly ipCacheService: IpCacheService,
    private readonly ipRepository: IpRepository,
  ) {}

  /**
   * Looks up IP data into Redis cache, DB and if not found requests it from IpWhoisAPI
   * As a side effect it caches and stores all requests IP data
   */
  async getIpData(ip: string): Promise<IpLookupDto> {
    const storedIpData = await this.getStoredIpData(ip);
    if (storedIpData) {
      return storedIpData;
    }

    const apiResponse = await this.ipwhoisConsumerService.getIpData(ip);

    await this.persist(ip, apiResponse);

    return apiResponse;
  }

  private async getStoredIpData(ip: string): Promise<IpwhoisResponse | null> {
    const cachedData = await this.ipCacheService.getCachedIpData(ip);

    if (cachedData) {
      return cachedData;
    }

    return this.ipRepository.getIpData(ip);
  }

  private async persist(ip: string, apiResponse: IpwhoisResponse) {
    // Persist in Redis for short term
    await this.ipCacheService.cacheIpData(ip, apiResponse);

    // Persist in Postgres DB for long term storage
    await this.ipRepository.storeIpData(ip, apiResponse);
  }
}
