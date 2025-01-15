import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IpEntity } from './ip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IpRepository {
  constructor(
    @InjectRepository(IpEntity)
    private readonly ipEntityRepository: Repository<IpEntity>,
  ) {}
}
