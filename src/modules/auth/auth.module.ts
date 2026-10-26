import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity.js';
import { RoleEntity } from './entities/role.entity.js';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE } from './tokens.js';

@Module({
  imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity]),
          JwtModule.registerAsync({
            global: true, // JwtService disponible en TODOS los módulos (lo necesita el JwtAuthGuard)
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: Number(config.getOrThrow<string>('JWT_EXPIRES_IN')), // segundos
                },
            }),
        }),
  ],
  controllers: [AuthController],
  providers: [
    {
            provide: AUTH_SERVICE,
            useClass: AuthService,
        },
  ]
})
export class AuthModule {}
