import { Country } from '../../utils/country.enum';

/**
 * Represents the "currency" object in the IPWhois response.
 * Provides details about the currency used in the country.
 */
export interface Currency {
  /**
   * The name of the currency (e.g., United States Dollar).
   */
  name: string;
  /**
   * The currency code (ISO 4217), e.g., USD.
   */
  code: string;
  /**
   * The currency symbol (e.g., $).
   */
  symbol: string;
}

/**
 * Represents the "timezone" object in the IPWhois response.
 * Provides details about the timezone associated with the IP location.
 */
export interface Timezone {
  /**
   * The timezone ID (e.g., America/Los_Angeles).
   */
  id?: string;

  /**
   * The Abbreviation of the Timezone (e.g. PDT)
   */
  abbr: string;

  /**
   * true or false depending on whether or not Daylight Savings have been accounted for.
   */
  is_dst: boolean;

  /**
   * The offset from UTC (in seconds) for the given location (e.g. -25200 for PDT's -7h UTC offset)
   */
  offset: number;

  /**
   * The UTC offset of the Timezone (e.g. -07:00)
   */
  utc?: string;

  /**
   * The exact current date and time (ISO 8601 format) associated with location (e.g. 2022-04-22T14:31:48-07:00)
   */
  current_time?: string;
}

/**
 * Represents the "asn" object in the IPWhois response.
 * Provides details related to the autonomous system associated with the IP address.
 */
export interface Asn {
  /**
   * The Autonomous System Number (ASN) related to the IP (e.g., AS15169).
   */
  asn?: string;
  /**
   * The name of the organization responsible for the ASN (e.g., Google LLC).
   */
  name?: string;
  /**
   * Domain associated with the ASN (e.g., google.com).
   */
  domain?: string;
  /**
   * The IP route associated with the ASN (e.g., 8.8.0.0/16).
   */
  route?: string;
  /**
   * The type of ASN allocation (e.g., allocated, legacy).
   */
  type?: string;
}

export interface Connection {
  /**
   * The Autonomous System (AS) Number (e.g. 15169)
   */
  asn: number;
  /**
   * The name of the organization that owns the Autonomous System for the IP address that is analyzed (e.g. Google LLC)
   */
  org: string;
  /**
   * The name of the ISP associated with the IP (e.g. Google LLC)
   */
  isp: string;
  /**
   * The domain name associated with the organization that owns the connection IP (e.g. google.com)
   */
  domain: 'google.com';
}

/**
 * Represents the "security" object in the IPWhois response.
 * Provides details related to fraud prevention and security for the IP.
 */
export interface Security {
  /**
   * True if the IP address is a proxy, false otherwise.
   */
  is_proxy: boolean;

  /**
   * The type of proxy. Examples include VPN, TOR, etc.
   */
  proxy_type?: string;

  /**
   * True if the IP address is a crawler, false otherwise.
   */
  is_crawler: boolean;

  /**
   * The name or type of crawler, if applicable.
   */
  crawler_name?: string;

  /**
   * True if the IP address is a tor exit node, false otherwise.
   */
  is_tor: boolean;

  /**
   * Whether the IP represents a threat based on known security databases.
   */
  threat_level?: 'low' | 'medium' | 'high';

  /**
   * A description of the threat associated with this IP, if any.
   */
  threat_types?: string[];
}

/**
 * Represents the "flag" object in the IPWhois response.
 * Provides details about the country's flag associated with the IP location.
 */
export interface Flag {
  /**
   * The URL to the image of the country's flag (e.g., a PNG or SVG file).
   */
  img: string;

  /**
   * The emoji representation of the country's flag, if available.
   */
  emoji?: string;

  /**
   * Unicode values associated with the country's flag emoji (e.g., U+1F1FA U+1F1F8 for 🇺🇸).
   */
  emoji_unicode?: string;
}

/**
 * Updated IpwhoisResponse with optional fields extended from the base structure.
 */
export interface IpwhoisResponse {
  /**
   * IP used for the query (e.g., 8.8.4.4).
   */
  ip: string;
  /**
   * If the query is successful, true will be returned, and false if it fails.
   */
  success: boolean;
  /**
   * Included only when success is false. Can be one of:
   * - Invalid IP address
   * - You've hit the monthly limit
   * - Reserved range
   */
  message?: string;
  /**
   * IP type (IPv4 or IPv6).
   */
  type: string;
  /**
   * Name of the continent (e.g., North America).
   */
  continent?: string;
  /**
   * Two-letter (ISO 3166-1) continent code (e.g., NA).
   */
  continent_code?: keyof typeof Country;
  /**
   * Name of the country (e.g., United States).
   */
  country?: string;
  /**
   * Two-letter (ISO 3166-1) country code (e.g., US).
   */
  country_code?: keyof typeof Country;
  /**
   * Name of the state or region (e.g., California).
   */
  region?: string;
  /**
   * ISO 3166-2 region code (e.g., CA).
   */
  region_code?: keyof typeof Country;
  /**
   * Name of the city (e.g., Mountain View).
   */
  city?: string;
  /**
   * Approximate geographic latitude of the location (e.g., 37.3860517).
   */
  latitude?: number;
  /**
   * Approximate geographic longitude of the location (e.g., -122.0838511).
   */
  longitude?: number;
  /**
   * True or false depending on whether the IP's country is in the European Union.
   */
  is_eu?: boolean;
  /**
   * ZIP/Postal code for the IP location (e.g., 94043).
   */
  postal?: string;
  /**
   * Country calling code (e.g., 1 for the USA).
   */
  calling_code?: string;
  /**
   * Capital city of the country (e.g., Washington, D.C.).
   */
  capital?: string;
  /**
   * Two-letter ISO (3166-1) codes of countries bordering this IP's country (e.g., CA, MX).
   */
  borders?: string | null;
  /**
   * Information about the currency associated with the IP address.
   */
  currency?: Currency;
  /**
   * Timezone information associated with the IP address.
   */
  timezone?: Timezone;
  /**
   * Autonomous System Number (ASN) information for the IP.
   */
  asn?: Asn;
  /**
   * Connection information associated with the IP address.
   */
  connection?: Connection;
  /**
   * Security information associated with the IP address, such as proxy or threat details.
   */
  security?: Security;

  /**
   * Information about the country's flag associated with the IP address.
   */
  flag?: Flag;
}
