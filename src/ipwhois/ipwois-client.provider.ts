import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { Provider } from '@nestjs/common';

export const IPWHOIS_CLIENT = 'IPWHOIS_CLIENT';

/**
 * usage
 * in module:
 * providers: [IpwhoisClientProvider]
 *
 * with DI
 *  @Inject(IPWHOIS_CLIENT)
 *  private readonly ipwhoisClient: AxiosInstance,
 */
export const IpwhoisClientProvider: Provider = {
  provide: IPWHOIS_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AxiosInstance => {
    const baseUrl = configService.getOrThrow('ipwhois.baseUrl', {
      infer: true,
    });
    return axios.create({
      baseURL: baseUrl,
    });
  },
};
