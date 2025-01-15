import { DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { RedisOptions } from 'ioredis/built/redis/RedisOptions';

export class RedisModule {
  public static forRoot(options?: RedisOptions): DynamicModule {
    return {
      global: true,
      module: RedisModule,
      providers: [
        {
          provide: RedisService,
          inject: [ConfigService],
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return new RedisService(
              new Redis({
                host: configService.getOrThrow('redis.host', { infer: true }),
                port: configService.getOrThrow('redis.port', { infer: true }),
                ...options,
              }),
            );
          },
        },
      ],
      exports: [RedisService],
    };
  }
}
