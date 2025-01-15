import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';
import { Environment } from './environment.enum';

export default registerAs<AppConfig>('app', () => ({
  nodeEnv: process.env.NODE_ENV || Environment.Development,
  port: process.env.APP_PORT
    ? parseInt(process.env.APP_PORT, 10)
    : process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : 3000,
}));
