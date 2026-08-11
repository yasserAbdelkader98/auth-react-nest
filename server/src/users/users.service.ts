import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './users.dto'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async findByEmail(email: string) {
        return this.userModel.findOne({ email }).lean();
    }

    async register(data: UserDto){
        try {
            const newUser = new this.userModel({
                password: await bcrypt.hash(data.password, 10),
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            });

            const registeredUser = await newUser.save();
            const { password, ...userInfo } = registeredUser.toObject();
            return userInfo;
        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 11000
            ) {
                throw new ConflictException('Email already exists!');
            }

            throw error;
        }
    }

    async deleteMyAccount(id: string){
        const deletedUser = await this.userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new NotFoundException('Account does not exist');
        }

        return { message: 'Account deleted successfully' };
    }
}
