import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}
    
    async login(data: LoginDto){
        const user = await this.usersService.findByEmail(data.email)
        if(!user){
            throw new UnauthorizedException("Invalid Credentials!")
        }
        
        if (!await bcrypt.compare(data.password, user.password)) throw new UnauthorizedException("Invalid Credentials!");

        const token = await this.jwtService.signAsync({ id: user._id, email: user.email })

        const { password, ...userInfo } = user
        return { userInfo, token };
    }
}
