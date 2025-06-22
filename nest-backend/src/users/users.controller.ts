import { Body, Controller, Delete, ForbiddenException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'
import { UserDto } from './users.dto'
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post('register')
    async register(@Body() user: UserDto){
        return await this.userService.register(user) 
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteMyAccount(@Param('id') id: string, @Req() req: Request){

        const decodedData = req['user']
        if (decodedData.id != id) {
            throw new ForbiddenException('Not Authorized!');
        }
        return this.userService.deleteMyAccount(id)
    }
}
