import { Body, Controller, Get, HttpCode, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AUTH_SERVICE } from './tokens.js';
import type { AuthServiceInterface } from './auth-service.interface.js';
import { RegisterInDto } from './dto/register-in-dto.js';
import { LoginInDto } from './dto/login-in-dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import type { AuthenticatedRequest } from './interfaces/jwt-payload.interface.js';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authService: AuthServiceInterface,
    ) {}

        // Público: cualquiera puede registrarse
    @Post('register')
    register(@Body() dto: RegisterInDto) {
        return this.authService.register(dto);
    }
        // Público: si pidiera token, nadie podría obtener el primero
    @Post('login')
    @HttpCode(200)
    login(@Body() dto: LoginInDto) {
        return this.authService.login(dto);
    }
        // Protegido: solo con token válido. Devuelve el payload del token
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    profile(@Req() request: AuthenticatedRequest) {
        return request.user;
    }
}
