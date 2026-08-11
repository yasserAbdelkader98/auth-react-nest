import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AUTH_COOKIE_NAME } from './auth-cookie.config';
import { AuthenticatedRequest, AuthPayload } from './auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<AuthPayload>(token);
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const cookies = request.cookies as unknown;

    if (typeof cookies !== 'object' || cookies === null) {
      return undefined;
    }

    const token = (cookies as Record<string, unknown>)[AUTH_COOKIE_NAME];
    return typeof token === 'string' ? token : undefined;
  }
}
