import { ApiResponseProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Asn,
  Currency,
  IpwhoisResponse,
  Timezone,
  Security,
  Flag,
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
    example: 'PDT',
    type: String,
  })
  abbr: string;

  @ApiResponseProperty({
    example: true,
    type: Boolean,
  })
  is_dst: boolean;

  @ApiResponseProperty({
    example: -25200,
    type: Number,
  })
  offset: number;

  @ApiPropertyOptional({
    example: '-07:00',
    type: String,
  })
  utc?: string;

  @ApiPropertyOptional({
    example: '2022-04-22T14:31:48-07:00',
    type: String,
  })
  current_time?: string;
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

// DTO for the Security object
class SecurityDto implements Security {
  @ApiResponseProperty({
    example: true,
    type: Boolean,
  })
  is_proxy: boolean;

  @ApiPropertyOptional({
    example: 'VPN',
    type: String,
  })
  proxy_type?: string;

  @ApiResponseProperty({
    example: false,
    type: Boolean,
  })
  is_crawler: boolean;

  @ApiPropertyOptional({
    example: 'Googlebot',
    type: String,
  })
  crawler_name?: string;

  @ApiResponseProperty({
    example: false,
    type: Boolean,
  })
  is_tor: boolean;

  @ApiPropertyOptional({
    example: 'low',
    type: String,
    enum: ['low', 'medium', 'high'],
  })
  threat_level?: 'low' | 'medium' | 'high';

  @ApiPropertyOptional({
    example: ['fraud', 'bot'],
    type: [String],
  })
  threat_types?: string[];
}

// DTO for the Flag object
class FlagDto implements Flag {
  @ApiResponseProperty({
    example: 'https://cdn.ipwhois.io/flags/us.png',
    type: String,
  })
  img: string;

  @ApiPropertyOptional({
    example: '🇺🇸',
    type: String,
  })
  emoji?: string;

  @ApiPropertyOptional({
    example: 'U+1F1FA U+1F1F8',
    type: String,
  })
  emoji_unicode?: string;
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
  continent_code?: keyof typeof Country;

  @ApiPropertyOptional({
    example: 'United States',
    type: String,
  })
  country?: string;

  @ApiPropertyOptional({
    example: 'US',
    type: String,
  })
  country_code?: keyof typeof Country;

  @ApiPropertyOptional({
    example: 'California',
    type: String,
  })
  region?: string;

  @ApiPropertyOptional({
    example: 'CA',
    type: String,
  })
  region_code?: keyof typeof Country;

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
    example: 'Washington, D.C.',
    type: String,
  })
  capital?: string;

  @ApiPropertyOptional({
    example: 'CA,MX',
    type: [String],
  })
  borders?: string | null;

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

  @ApiPropertyOptional({
    type: SecurityDto,
  })
  @Type(() => SecurityDto)
  security?: SecurityDto;

  @ApiPropertyOptional({
    type: FlagDto,
  })
  @Type(() => FlagDto)
  flag?: FlagDto;
}
