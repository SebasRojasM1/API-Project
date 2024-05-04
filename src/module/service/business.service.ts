import { Injectable } from '@nestjs/common';
import { businessEntity } from '../entities';
import { registerBusinessDto } from 'src/libs/Dtos/business';
import { Model } from 'mongoose';

@Injectable()
export class businessService {

    constructor(private businessModel: Model<businessEntity>){}

    async findAll(){
        return this.businessModel.find()
    }

    async findOneByEmail(email: string){
        return await this.businessModel.findOne({email})
    }

    async findById(id: string){
        return await this.businessModel.findById(id)
    }

    async create(RegisterBusinessDto: registerBusinessDto){
        const newBusiness = new this.businessModel(RegisterBusinessDto)
        return await newBusiness.save()
    }

}