import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import validationOptions from './utils/validation-options';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { Environment } from './config/environment.enum';
import { useContainer } from 'class-validator';

const SWAGGER_DISABLED_ON_ENVS = [Environment.Production];
function invokeSwagger(app: INestApplication, env: Environment) {
  // Swagger kill switch based on env
  if (SWAGGER_DISABLED_ON_ENVS.includes(env)) return false;

  const config = new DocumentBuilder()
    .setTitle(process.env.npm_package_name || 'IP lookup API')
    .setVersion(process.env.npm_package_version ?? '1.0.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  return true;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  // Invoke class-validator by default
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerInvoked = invokeSwagger(
    app,
    configService.getOrThrow('app.nodeEnv', { infer: true }),
  );

  const port = configService.getOrThrow('app.port', { infer: true });
  await app.listen(port);

  console.log(`Listening on port: ${port}`);
  if (swaggerInvoked) {
    console.log(`Swagger available on url http://localhost:${port}/docs`);
  }
}
bootstrap();
