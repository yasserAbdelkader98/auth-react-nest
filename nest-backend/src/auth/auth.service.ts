import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from '../users/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ){}
    
    async login(data: LoginDto){
        let user = await this.userModel.findOne({ email: data.email }).lean()
        if(!user){
            throw new UnauthorizedException("Invalid Credentials!")
        }
        
        if (!await bcrypt.compare(data.password, user.password)) throw new UnauthorizedException("Invalid Credentials!");

        let token = await this.jwtService.signAsync({ id: user._id, email: user.email })

        const { password, ...userInfo } = user
        return {
            ...userInfo,
            token
        };
    }
}
