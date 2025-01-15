import { registerAs } from '@nestjs/config';
import validateConfig from '../../utils/validate-config';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { IpwhoisConfig } from './ipwhois-config.type';

class EnvironmentVariablesValidator {
  @IsUrl()
  @IsNotEmpty()
  IPWHOIS_BASE_URL: string;
}

export default registerAs<IpwhoisConfig>('ipwhois', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    baseUrl: process.env.IPWHOIS_BASE_URL as string,
  };
});
