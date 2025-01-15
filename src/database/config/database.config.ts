import { registerAs } from '@nestjs/config';

import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import validateConfig from '../../utils/validate-config';
import { DatabaseConfig } from './database-config.type';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_TYPE?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => parseInt(value, 10))
  DATABASE_PORT: number = 5432;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_PASSWORD?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  DATABASE_SYNCHRONIZE?: boolean;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  DATABASE_MAX_CONNECTIONS: number = 100;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  DATABASE_SSL_ENABLED?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  DATABASE_REJECT_UNAUTHORIZED?: boolean;

  @IsString()
  @IsOptional()
  DATABASE_CA?: string;

  @IsString()
  @IsOptional()
  DATABASE_KEY?: string;

  @IsString()
  @IsOptional()
  DATABASE_CERT?: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  const config = validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    url: config.DATABASE_URL,
    type: config.DATABASE_TYPE,
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    password: config.DATABASE_PASSWORD,
    name: config.DATABASE_NAME,
    username: config.DATABASE_USERNAME,
    synchronize: config.DATABASE_SYNCHRONIZE,
    maxConnections: config.DATABASE_MAX_CONNECTIONS,
    sslEnabled: config.DATABASE_SSL_ENABLED,
    rejectUnauthorized: config.DATABASE_REJECT_UNAUTHORIZED,
    ca: config.DATABASE_CA,
    key: config.DATABASE_KEY,
    cert: config.DATABASE_CERT,
  };
});
