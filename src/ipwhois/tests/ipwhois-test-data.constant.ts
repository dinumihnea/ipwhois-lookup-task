import { IpwhoisResponse } from '../interfaces/ipwhois.response';

export const ipwhoisResponseMock: IpwhoisResponse = {
  ip: '8.8.4.7',
  success: true,
  type: 'IPv4',
  continent: 'North America',
  continent_code: 'NA',
  country: 'United States',
  country_code: 'US',
  region: 'California',
  region_code: 'CA',
  city: 'Mountain View',
  latitude: 37.3860517,
  longitude: -122.0838511,
  is_eu: false,
  postal: '94039',
  calling_code: '1',
  capital: 'Washington D.C.',
  borders: 'CA,MX',
  flag: {
    img: 'https://cdn.ipwhois.io/flags/us.svg',
    emoji: '🇺🇸',
    emoji_unicode: 'U+1F1FA U+1F1F8',
  },
  connection: {
    asn: 15169,
    org: 'Google LLC',
    isp: 'Google LLC',
    domain: 'google.com',
  },
  timezone: {
    id: 'America/Los_Angeles',
    abbr: 'PST',
    is_dst: false,
    offset: -28800,
    utc: '-08:00',
    current_time: '2025-01-15T08:51:28-08:00',
  },
};
