import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userEntity} from 'src/module/users/entities/users.entities';
import { InjectModel } from '@nestjs/mongoose';
import { registerUserDto } from 'src/libs/Dtos/users';
import { Model } from 'mongoose';

@Injectable()
export class userService {

    constructor(@InjectModel(userEntity.name) private userModel: Model<userEntity>){}

    async findAll(){
        return this.userModel.find()
    }

    async findOneByEmail(email: string){
        return await this.userModel.findOne({email}).exec()
    }

    async findByPassword(password: string){

        return await this.userModel.findOne({password})
    }

    async findById(id: string){
        return await this.userModel.findById(id)
    }

    async create(RegisterUserDto: registerUserDto): Promise<userEntity>{

        const recentUser = await this.userModel.findOne({email: RegisterUserDto.email}).exec()

        if(recentUser){
            throw new HttpException(`The email ${RegisterUserDto.email} already exists`, HttpStatus.BAD_REQUEST)
        }
        
        const newUser = new this.userModel(RegisterUserDto)
        return await newUser.save()
    }
}
