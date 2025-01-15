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
   * GMT offset of the timezone (e.g., -7:00).
   */
  gmt_offset?: string;
  /**
   * Abbreviation for the timezone (e.g., PDT).
   */
  code?: string;
  /**
   * Indicates if the IP's location is currently observing daylight saving time (DST).
   */
  is_daylight_saving?: boolean;
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
  continent_code?: keyof Country;
  /**
   * Name of the country (e.g., United States).
   */
  country?: string;
  /**
   * Two-letter (ISO 3166-1) country code (e.g., US).
   */
  country_code?: keyof Country;
  /**
   * Name of the state or region (e.g., California).
   */
  region?: string;
  /**
   * ISO 3166-2 region code (e.g., CA).
   */
  region_code?: keyof Country;
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
  borders?: Array<keyof Country> | null;
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
}
