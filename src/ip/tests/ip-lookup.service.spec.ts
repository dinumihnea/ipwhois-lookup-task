import { IpLookupService } from '../ip-lookup.service';
import { IpwhoisConsumerService } from '../../ipwhois/ipwhois-consumer.service';
import { IpCacheService } from '../ip-cache.service';
import { IpRepository } from '../ip.repository';
import { ipEntityMock, ipwhoisResponseMock } from './ip-test-data.constant';
import Mocked = jest.Mocked;

const ipwhoisConsumerServiceMock = {
  getIpData: jest.fn(() => Promise.resolve(ipwhoisResponseMock)),
} as any as Mocked<IpwhoisConsumerService>;

const ipCacheServiceMock = {
  cacheIpData: jest.fn(() => Promise.resolve()),
  getCachedIpData: jest.fn(() => Promise.resolve(ipwhoisResponseMock)),
} as any as Mocked<IpCacheService>;

const ipRepositoryMock = {
  storeIpData: jest.fn(() => Promise.resolve(ipEntityMock)),
  getIpData: jest.fn(() => Promise.resolve(ipEntityMock)),
} as any as Mocked<IpRepository>;

describe('IpLookupService', () => {
  let service: IpLookupService;

  beforeEach(async () => {
    service = new IpLookupService(
      ipwhoisConsumerServiceMock,
      ipCacheServiceMock,
      ipRepositoryMock,
    );

    jest.clearAllMocks();
  });

  describe('.getIpData', () => {
    const testIp = ipwhoisResponseMock.ip;

    it('should lookup in Redis cache it data is persisted', async () => {
      await service.getIpData(testIp);

      expect(ipCacheServiceMock.getCachedIpData).toHaveBeenCalledWith(testIp);
    });

    it('should lookup in DB if data is not persisted in Redis', async () => {
      ipCacheServiceMock.getCachedIpData.mockResolvedValueOnce(null);

      await service.getIpData(testIp);

      expect(ipRepositoryMock.getIpData).toHaveBeenCalledWith(testIp);
    });

    it('should provide getIpData from ipwhois if it was not previously persisted', async () => {
      ipCacheServiceMock.getCachedIpData.mockResolvedValueOnce(null);
      ipRepositoryMock.getIpData.mockResolvedValueOnce(null);

      const data = await service.getIpData(testIp);

      expect(data).toEqual(ipwhoisResponseMock);
      expect(ipwhoisConsumerServiceMock.getIpData).toHaveBeenCalledWith(testIp);
    });

    it('should store data in Redis if it was not previously persisted', async () => {
      ipCacheServiceMock.getCachedIpData.mockResolvedValueOnce(null);
      ipRepositoryMock.getIpData.mockResolvedValueOnce(null);

      await service.getIpData(testIp);

      expect(ipCacheServiceMock.cacheIpData).toHaveBeenCalledWith(
        testIp,
        ipwhoisResponseMock,
      );
    });

    it('should store data in DB if it was not previously persisted', async () => {
      ipCacheServiceMock.getCachedIpData.mockResolvedValueOnce(null);
      ipRepositoryMock.getIpData.mockResolvedValueOnce(null);

      await service.getIpData(testIp);

      expect(ipRepositoryMock.storeIpData).toHaveBeenCalledWith(
        testIp,
        ipwhoisResponseMock,
      );
    });
  });
});
