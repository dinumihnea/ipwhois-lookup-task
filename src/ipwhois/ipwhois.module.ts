import { Module } from '@nestjs/common';
import { IpwhoisConsumerService } from './ipwhois-consumer.service';
import { ConfigModule } from '@nestjs/config';
import { IpwhoisClientProvider } from './ipwois-client.provider';

/**
 * This module wraps the communications with ipwhois API
 */
@Module({
  imports: [ConfigModule],
  providers: [IpwhoisClientProvider, IpwhoisConsumerService],
  exports: [IpwhoisConsumerService],
})
export class IpwhoisModule {}
