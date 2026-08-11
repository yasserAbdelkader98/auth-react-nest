import { Body, Controller, Delete, ForbiddenException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service'
import { UserDto } from './users.dto'
import { AuthGuard } from '../auth/auth.guard';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RateLimitService } from '../rate-limit/rate-limit.service';

@ApiTags('register')
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly rateLimitService: RateLimitService,
    ){}

    @Post('register')
    @ApiBody({ type: UserDto })
    async register(@Body() user: UserDto, @Req() request: Request){
        const ip = request.ip || request.socket.remoteAddress || 'unknown';
        this.rateLimitService.recordRegistrationAttempt(ip);
        return await this.userService.register(user) 
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'User _id' })
    @UseGuards(AuthGuard)
    async deleteMyAccount(@Param('id') id: string, @Req() req: Request){

        const decodedData = req['user']
        if (decodedData.id != id) {
            throw new ForbiddenException('Not Authorized!');
        }
        return this.userService.deleteMyAccount(id)
    }
}
