import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpEntity } from './ip.entity';
import { IpRepository } from './ip.repository';
import { IpwhoisModule } from '../ipwhois/ipwhois.module';
import { IpLookupService } from './ip-lookup.service';
import { IpController } from './ip.controller';
import { IpCacheService } from './ip-cache.service';
import { IpCleanupService } from './ip-cleanup.service';

@Module({
  imports: [TypeOrmModule.forFeature([IpEntity]), IpwhoisModule],
  controllers: [IpController],
  providers: [IpLookupService, IpCacheService, IpRepository, IpCleanupService],
  exports: [],
})
export class IpModule {}
