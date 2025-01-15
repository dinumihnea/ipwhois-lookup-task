import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpEntity } from './ip.entity';
import { IpRepository } from './ip.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IpEntity])],
  providers: [IpRepository],
  exports: [],
})
export class IpModule {}
