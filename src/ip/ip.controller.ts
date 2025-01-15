import { Controller, Get, Query } from '@nestjs/common';
import { IpLookupService } from './ip-lookup.service';
import { IpLookupDto } from './dto/ip-lookup.dto';
import { IpLookupQueryDto } from './dto/ip-lookup-query.dto';
import { NoEmptyPayloadPipe } from '../utils/pipes/no-empty-payload.pipe';

@Controller('ips')
export class IpController {
  constructor(private readonly ipLookupService: IpLookupService) {}

  /**
   * Lookup IP details and cache
   * @param {IpLookupQueryDto} ipLookupQuery - the query object
   */
  @Get('')
  async getIpDetails(
    @Query(NoEmptyPayloadPipe) ipLookupQuery: IpLookupQueryDto,
  ): Promise<IpLookupDto> {
    return this.ipLookupService.getIpDetails(ipLookupQuery.ip);
  }
}
