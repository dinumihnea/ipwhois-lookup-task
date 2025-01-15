import { AppConfig } from './app-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { IpwhoisConfig } from '../ipwhois/config/ipwhois-config.type';
import { RedisConfig } from '../redis/config/redis-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  ipwhois: IpwhoisConfig;
  redis: RedisConfig;
};
