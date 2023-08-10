import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'USER_CLIENT',
          imports: [ConfigModule],
          useFactory(configService: ConfigService) {
            return {
              transport: Transport.GRPC,
              options: {
                package: 'user',
                protoPath: join(__dirname, '../../../proto/proto/user.proto'),
                url: configService.get('USER_URL'),
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPRIED_IN') },
        };
      },
      inject: [ConfigService],
    }),
    PassportModule,
    ConfigModule,
    PrismaModule,
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
