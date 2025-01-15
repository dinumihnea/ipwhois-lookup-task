import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { IpwhoisResponse } from './interfaces/ipwhois.response';
import { IPWHOIS_CLIENT } from './ipwois-client.provider';

@Injectable()
export class IpwhoisConsumerService {
  private readonly defaultErrorMessage = 'Failed to fetch IP details';

  constructor(
    @Inject(IPWHOIS_CLIENT)
    private readonly ipwhoisClient: AxiosInstance,
  ) {}

  /**
   * Fetches data from the ipwhois API for a given IP address.
   * @param {string} ip The IP address to query.
   * @returns {IpwhoisResponse} The IP details
   */
  async getIpData(ip: string): Promise<IpwhoisResponse> {
    let data: IpwhoisResponse;
    try {
      data = await this.callIpwhois(ip);
    } catch (error) {
      throw this.createHttpException(
        error.response?.data?.message ||
          error.message ||
          this.defaultErrorMessage,
      );
    }

    if (!data.success) {
      throw this.createHttpException();
    }

    return data;
  }

  private async callIpwhois(ip: string): Promise<IpwhoisResponse> {
    const { data } = await this.ipwhoisClient.get<IpwhoisResponse>(`/${ip}`);
    return data;
  }

  private createHttpException(errorMessage?: string): HttpException {
    return new HttpException(
      errorMessage || this.defaultErrorMessage,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
