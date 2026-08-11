
import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RateLimitService } from '../rate-limit/rate-limit.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rateLimitService: RateLimitService,
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

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return userInfo;
  }

  @HttpCode(200)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { message: 'Successfully logged out' };
  }
}
