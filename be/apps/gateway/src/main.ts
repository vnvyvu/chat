import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appContext = await NestFactory.createApplicationContext(
    ConfigModule.forRoot(),
  );
  const configService = appContext.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, '../../../proto/proto/auth.proto'),
      url: configService.get('GATEWAY_URL'),
    },
  });

  await app.startAllMicroservices();
  Logger.log('Auth service is running!');

  await app.listen(3000);
}
bootstrap();
