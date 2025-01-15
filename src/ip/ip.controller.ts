import { Controller, Delete, Get, HttpCode, Query } from '@nestjs/common';
import { IpLookupService } from './ip-lookup.service';
import { IpLookupDto } from './dto/ip-lookup.dto';
import { IpLookupQueryDto } from './dto/ip-lookup-query.dto';
import { NoEmptyPayloadPipe } from '../utils/pipes/no-empty-payload.pipe';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { IpCleanupService } from './ip-cleanup.service';

@Controller('ips')
export class IpController {
  constructor(
    private readonly ipLookupService: IpLookupService,
    private readonly ipCleanupService: IpCleanupService,
  ) {}

  /**
   * Lookup IP details and cache
   * @param {IpLookupQueryDto} ipLookupQuery - the query object
   */
  @ApiOkResponse({
    description: 'IP data',
    type: IpLookupDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Invalid payload' })
  @Get()
  async getIpData(
    @Query(NoEmptyPayloadPipe) ipLookupQuery: IpLookupQueryDto,
  ): Promise<IpLookupDto> {
    return this.ipLookupService.getIpData(ipLookupQuery.ip);
  }

  /**
   * Removes stored IP data
   * @param {IpLookupQueryDto} ipLookupQuery - the query object
   */
  @ApiNoContentResponse({
    description: 'IP data deleted',
  })
  @ApiUnprocessableEntityResponse({ description: 'Invalid payload' })
  @Delete()
  @HttpCode(204)
  async removeStoredIpData(
    @Query(NoEmptyPayloadPipe) ipLookupQuery: IpLookupQueryDto,
  ): Promise<void> {
    return this.ipCleanupService.removeStoredIpData(ipLookupQuery.ip);
  }
}
