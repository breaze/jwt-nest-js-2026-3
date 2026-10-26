import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthenticatedRequest, JwtPayload } from '../interfaces/jwt-payload.interface.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Falta el token');
        }

        try {
            // Verifica firma y expiración con JWT_SECRET
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
            request.user = payload;
        } catch {
            throw new UnauthorizedException('Token inválido o expirado');
        }
        return true;
    }
  constructor(private readonly jwtService: JwtService) {}
      private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
