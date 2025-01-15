import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';
import { Environment } from './environment.enum';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import validateConfig from '../utils/validate-config';
import { Transform } from 'class-transformer';

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  APP_PORT: number = 3000;
}

export default registerAs<AppConfig>('app', () => {
  const config = validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: config.NODE_ENV,
    port: config.APP_PORT,
  };
});
