import { AppConfig } from './app-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { IpwhoisConfig } from '../ipwhois/config/ipwhois-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  ipwhois: IpwhoisConfig;
};
