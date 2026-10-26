import { CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { RoleName } from '../enums/role-name.enum.js';
import { AuthenticatedRequest } from '../interfaces/jwt-payload.interface.js';
import { Observable } from 'rxjs';


export class RolesGuard implements CanActivate {

  private readonly allowedRoles: string[];

  constructor(...allowedRoles: RoleName[]) {
      this.allowedRoles = allowedRoles;
  }
      canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

        // request.user lo cargó el JwtAuthGuard (por eso va primero)
        const user = request.user;
        if (!user) {
            throw new UnauthorizedException('Falta el JwtAuthGuard antes del RolesGuard');
        }

        // Basta con tener UNO de los roles permitidos
        const hasRole = user.roles.some((role) => this.allowedRoles.includes(role));
        if (!hasRole) {
            throw new ForbiddenException(`Requiere uno de estos roles: ${this.allowedRoles.join(', ')}`);
        }
        return true;
    }
      
}