import { IpCleanupService } from '../ip-cleanup.service';
import { IpCacheService } from '../ip-cache.service';
import { IpRepository } from '../ip.repository';
import { ipwhoisResponseMock } from './ip-test-data.constant';
import Mocked = jest.Mocked;

const ipCacheServiceMock = {
  removeCachedIp: jest.fn(() => Promise.resolve()),
} as any as Mocked<IpCacheService>;

const ipRepositoryMock = {
  remove: jest.fn(() => Promise.resolve()),
} as any as Mocked<IpRepository>;

describe('IpCleanupService', () => {
  let service: IpCleanupService;

  beforeEach(async () => {
    service = new IpCleanupService(ipCacheServiceMock, ipRepositoryMock);

    jest.clearAllMocks();
  });

  describe('.removeStoredIpData', () => {
    const testIp = ipwhoisResponseMock.ip;

    it('should remove from Redis', async () => {
      await service.removeStoredIpData(testIp);

      expect(ipCacheServiceMock.removeCachedIp).toHaveBeenCalledWith(testIp);
    });

    it('should remove from DB', async () => {
      await service.removeStoredIpData(testIp);

      expect(ipRepositoryMock.remove).toHaveBeenCalledWith(testIp);
    });
  });
});
