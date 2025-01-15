import { ApiResponseProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Asn,
  Currency,
  IpwhoisResponse,
  Timezone,
} from '../../ipwhois/interfaces/ipwhois.response';
import { Country } from '../../utils/country.enum';

// DTO for the Currency object
class CurrencyDto implements Currency {
  @ApiResponseProperty({
    example: 'United States Dollar',
    type: String,
  })
  name: string;

  @ApiResponseProperty({
    example: 'USD',
    type: String,
  })
  code: string;

  @ApiResponseProperty({
    example: '$',
    type: String,
  })
  symbol: string;
}

// DTO for the Timezone object
class TimezoneDto implements Timezone {
  @ApiPropertyOptional({
    example: 'America/Los_Angeles',
    type: String,
  })
  id?: string;

  @ApiPropertyOptional({
    example: '-7:00',
    type: String,
  })
  gmt_offset?: string;

  @ApiPropertyOptional({
    example: 'PDT',
    type: String,
  })
  code?: string;

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
  })
  is_daylight_saving?: boolean;
}

// DTO for the ASN object
class AsnDto implements Asn {
  @ApiPropertyOptional({
    example: 'AS15169',
    type: String,
  })
  asn?: string;

  @ApiPropertyOptional({
    example: 'Google LLC',
    type: String,
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'google.com',
    type: String,
  })
  domain?: string;

  @ApiPropertyOptional({
    example: '8.8.0.0/16',
    type: String,
  })
  route?: string;

  @ApiPropertyOptional({
    example: 'allocated',
    type: String,
  })
  type?: string;
}

// Main DTO for IpLookup
export class IpLookupDto implements IpwhoisResponse {
  @ApiResponseProperty({
    example: '127.0.0.1',
    type: String,
  })
  ip: string;

  @ApiResponseProperty({
    example: true,
    type: Boolean,
  })
  success: boolean;

  @ApiPropertyOptional({
    example: 'Invalid IP address',
    type: String,
  })
  message?: string;

  @ApiResponseProperty({
    example: 'IPv4',
    type: String,
  })
  type: string;

  @ApiPropertyOptional({
    example: 'North America',
    type: String,
  })
  continent?: string;

  @ApiPropertyOptional({
    example: 'NA',
    type: String,
  })
  continent_code?: keyof Country;

  @ApiPropertyOptional({
    example: 'United States',
    type: String,
  })
  country?: string;

  @ApiPropertyOptional({
    example: 'US',
    type: String,
  })
  country_code?: keyof Country;

  @ApiPropertyOptional({
    example: 'California',
    type: String,
  })
  region?: string;

  @ApiPropertyOptional({
    example: 'CA',
    type: String,
  })
  region_code?: keyof Country;

  @ApiPropertyOptional({
    example: 'Mountain View',
    type: String,
  })
  city?: string;

  @ApiPropertyOptional({
    example: 37.3860517,
    type: Number,
  })
  latitude?: number;

  @ApiPropertyOptional({
    example: -122.0838511,
    type: Number,
  })
  longitude?: number;

  @ApiPropertyOptional({
    example: true,
    type: Boolean,
  })
  is_eu?: boolean;

  @ApiPropertyOptional({
    example: '94043',
    type: String,
  })
  postal?: string;

  @ApiPropertyOptional({
    example: '1',
    type: String,
  })
  calling_code?: string;

  @ApiPropertyOptional({
    example: 'Washington D.C.',
    type: String,
  })
  capital?: string;

  @ApiPropertyOptional({
    example: ['CA', 'MX'],
    type: [String],
  })
  borders?: Array<keyof Country> | null;

  @ApiPropertyOptional({
    type: CurrencyDto,
  })
  @Type(() => CurrencyDto)
  currency?: CurrencyDto;

  @ApiPropertyOptional({
    type: TimezoneDto,
  })
  @Type(() => TimezoneDto)
  timezone?: TimezoneDto;

  @ApiPropertyOptional({
    type: AsnDto,
  })
  @Type(() => AsnDto)
  asn?: AsnDto;
}
