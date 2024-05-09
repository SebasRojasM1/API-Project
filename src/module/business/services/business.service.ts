import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessEntity} from '../..';
import { registerBusinessDto } from 'src/libs/Dtos/business';
import { Model } from 'mongoose';

@Injectable()
export class BusinessService {

    constructor(@InjectModel(BusinessEntity.name) private businessModel: Model<BusinessEntity>){}

    async findAll(){
        return this.businessModel.find()
    }

    async findOneByEmail(email: string){
        return await this.businessModel.findOne({email})
    }

    async findByPassword(password: string){

        return await this.businessModel.findOne({password})
    }

    async findById(id: string){
        return await this.businessModel.findById(id)
    }

    async create(RegisterBusinessDto: registerBusinessDto){

        try{
            const newBusiness = new this.businessModel(RegisterBusinessDto)
            return await newBusiness.save()
        } catch(error){
            console.error(`Error saving the recent business ${error}`)
        }
      
    }

}