import { Injectable } from '@nestjs/common';
import { userEntity } from '../entities/users.entities';
import { registerUserDto } from 'src/libs/Dtos/users';
import { Model } from 'mongoose';

@Injectable()
export class userService {

    constructor(private userModel: Model<userEntity>){}

    async findAll(){
        return this.userModel.find()
    }

    async findOneByEmail(email: string){
        return await this.userModel.findOne({email})
    }

    async findById(id: string){
        return await this.userModel.findById(id)
    }

    async create(RegisterUserDto: registerUserDto){
        const newUser = new this.userModel(RegisterUserDto)
        return await newUser.save()
    }
}
