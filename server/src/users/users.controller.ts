import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RateLimitService } from '../rate-limit/rate-limit.service';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

@ApiTags('register')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly rateLimitService: RateLimitService,
  ) {}

  @Post('register')
  @ApiBody({ type: UserDto })
  async register(@Body() user: UserDto, @Req() request: Request) {
    const ip = request.ip || request.socket.remoteAddress || 'unknown';
    this.rateLimitService.recordRegistrationAttempt(ip);
    return this.userService.register(user);
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  async deleteMyAccount(@Req() request: AuthenticatedRequest) {
    return this.userService.deleteMyAccount(request.user.id);
  }
}
