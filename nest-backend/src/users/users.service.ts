import { ConflictException, Injectable, NotFoundException, BadGatewayException } from '@nestjs/common';
import { UserDto } from './users.dto'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async register(data: UserDto){
        
        let user = await this.userModel.findOne({ email: data.email }).lean()
        if(!user){

            let newUser = new this.userModel({
                password: await bcrypt.hash(data.password, 10),
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            })
            return await newUser.save()
        }else{
            throw new ConflictException('Email already exists!')
        }
    }

    async deleteMyAccount(id: string){
        let user = await this.userModel.findOne({ _id: id })
        if(user){
            return await user.deleteOne()
        }else{
            throw new NotFoundException('Account isnot exists!')
        } 
    }
}
