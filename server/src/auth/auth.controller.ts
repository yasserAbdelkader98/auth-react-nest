
import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RateLimitService } from '../rate-limit/rate-limit.service';
import { ConfigService } from '@nestjs/config';
import {
  AUTH_COOKIE_MAX_AGE_MS,
  AUTH_COOKIE_NAME,
  createAuthCookieOptions,
} from './auth-cookie.config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rateLimitService: RateLimitService,
    private readonly configService: ConfigService,
  ) {}

  @HttpCode(200)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(
    @Body() user: LoginDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const ip = request.ip || request.socket.remoteAddress || 'unknown';
    this.rateLimitService.assertLoginAllowed(user.email, ip);

    let token: string;
    let userInfo: Awaited<ReturnType<AuthService['login']>>['userInfo'];

    try {
      ({ token, userInfo } = await this.authService.login(user));
      this.rateLimitService.resetFailedLogins(user.email, ip);
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        this.rateLimitService.recordFailedLogin(user.email, ip);
      }

      throw error;
    }

    response.cookie(AUTH_COOKIE_NAME, token, {
      ...this.authCookieOptions(),
      maxAge: AUTH_COOKIE_MAX_AGE_MS,
    });

    return userInfo;
  }

  @HttpCode(200)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(AUTH_COOKIE_NAME, this.authCookieOptions());

    return { message: 'Successfully logged out' };
  }

  private authCookieOptions() {
    return createAuthCookieOptions(
      this.configService.get<string>('NODE_ENV') === 'production',
    );
  }
}
