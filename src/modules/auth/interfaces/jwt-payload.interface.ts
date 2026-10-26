import type { Request } from 'express';

// Claims que viajan dentro del token
export interface JwtPayload {
    sub: number;       // id del usuario
    username: string;
    roles: string[];
}

// Request de Express con el usuario que deja el JwtAuthGuard
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}