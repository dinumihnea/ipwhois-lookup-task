import { ipwhoisResponseMock } from './ipwhois-test-data.constant';
import Mocked = jest.Mocked;
import { AxiosInstance } from 'axios';
import { IpwhoisConsumerService } from '../ipwhois-consumer.service';
import { HttpException } from '@nestjs/common';

const succesfulResponseMock = {
  data: ipwhoisResponseMock,
};

const ipwhoisClientInstance = {
  get: jest.fn(() => Promise.resolve(succesfulResponseMock)),
} as any as Mocked<AxiosInstance>;

describe('IpwhoisConsumerService', () => {
  let service: IpwhoisConsumerService;

  beforeEach(async () => {
    service = new IpwhoisConsumerService(ipwhoisClientInstance);

    jest.clearAllMocks();
  });

  describe('.getIpData', () => {
    const testIp = ipwhoisResponseMock.ip;

    it('should provide the response when request succeeds', async () => {
      await expect(service.getIpData(testIp)).resolves.toEqual(
        ipwhoisResponseMock,
      );
    });

    it('should throw HttpException when request fails', async () => {
      ipwhoisClientInstance.get.mockRejectedValueOnce(new Error());

      await expect(service.getIpData(testIp)).rejects.toEqual(
        new HttpException('Failed to fetch IP details', 400),
      );
    });

    it('should throw HttpException when response "success" flag is false', async () => {
      ipwhoisClientInstance.get.mockResolvedValueOnce({
        data: { ...ipwhoisResponseMock, success: false },
      });

      await service.getIpData(testIp).catch((e) => {
        expect(e).toBeInstanceOf(HttpException);
        expect(e).toMatchObject({
          status: 500,
          message: 'Failed to fetch IP details',
        });
      });
      expect.assertions(2);
    });
  });
});
