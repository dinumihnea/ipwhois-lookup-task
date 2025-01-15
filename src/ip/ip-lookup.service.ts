import { Injectable } from '@nestjs/common';
import { IpwhoisConsumerService } from '../ipwhois/ipwhois-consumer.service';
import { IpLookupDto } from './dto/ip-lookup.dto';

@Injectable()
export class IpLookupService {
  constructor(
    private readonly ipwhoisConsumerService: IpwhoisConsumerService,
  ) {}

  async getIpDetails(ip: string): Promise<IpLookupDto> {
    // TODO remove
    const a = await this.ipwhoisConsumerService.getIpDetails(ip);
    console.log({ a });
    return a;
  }
}
