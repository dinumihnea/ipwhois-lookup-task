import { registerAs } from '@nestjs/config';
import validateConfig from '../../utils/validate-config';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { RedisConfig } from './redis-config.type';

class EnvironmentVariablesValidator {
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT: number;
}

export default registerAs<RedisConfig>('redis', () => {
  const config = validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  };
});
