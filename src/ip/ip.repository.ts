import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IpEntity } from './ip.entity';
import { Equal, Repository } from 'typeorm';
import { IpwhoisResponse } from '../ipwhois/interfaces/ipwhois.response';

@Injectable()
export class IpRepository {
  constructor(
    @InjectRepository(IpEntity)
    private readonly ipEntityRepository: Repository<IpEntity>,
  ) {}

  async storeIpData(ip: string, ipData: IpwhoisResponse): Promise<IpEntity> {
    return this.ipEntityRepository.save({ ip, data: ipData });
  }

  async getIpData(ip: string): Promise<IpEntity['data'] | null> {
    const ipEntity = await this.ipEntityRepository.findOneBy({
      ip: Equal(ip), // Equal to prevent https://github.com/typeorm/typeorm/issues/9316
    });

    return ipEntity?.data || null;
  }

  async remove(ip: string): Promise<void> {
    await this.ipEntityRepository.delete(ip);
  }
}
