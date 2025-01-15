import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IpwhoisResponse } from './interfaces/ipwhois.response';
import { IPWHOIS_CLIENT } from './ipwois-client.provider';

@Injectable()
export class IpwhoisConsumerService {
  constructor(
    @Inject(IPWHOIS_CLIENT)
    private readonly ipwhoisClient: AxiosInstance,
  ) {}

  /**
   * Fetches data from the ipwhois API for a given IP address.
   * @param {string} ip The IP address to query.
   * @returns {IpwhoisResponse} The IP details
   */
  async getIpDetails(ip: string): Promise<IpwhoisResponse> {
    try {
      return await this.callIpwhois(ip);
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message ||
          error.message ||
          'Error fetching IP details',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async callIpwhois(ip: string): Promise<IpwhoisResponse> {
    const { data } = await this.ipwhoisClient.get<IpwhoisResponse>(`/${ip}`);
    if (!data.success) {
      throw new HttpException(
        data || 'Failed to fetch IP details',
        HttpStatus.BAD_REQUEST,
      );
    }
    return data;
  }
}
