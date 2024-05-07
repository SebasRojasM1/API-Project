/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { BusinessEntity } from '../entities/business.entity';
import { CreateBusinessDto, UpdateBusinessDto } from '../dto';
import { Model } from 'mongoose';

@Injectable()
export class BusinessService {

    constructor(private businessModel: Model<BusinessEntity>){}

    async findAll(){
        return this.businessModel.find()
    }

    async findOneByEmail(email: string){
        return await this.businessModel.findOne({email})
    }

    async findById(id: string){
        return await this.businessModel.findById(id)
    }

    async create(createBusinessDto: CreateBusinessDto){
        const existingBusiness = await this.businessModel
      .findOne({ businessId: createBusinessDto.businessId })
      .exec();

    if (existingBusiness) {
      throw new HttpException(
        `The business with ID ${createBusinessDto.businessId} already exists`,
        HttpStatus.BAD_REQUEST, //Es un código de estado HTTP usado para indicar que la solicitud del cliente no pudo ser procesada debido a un error en la solicitud del cliente.
      );
    }

    const createdBusiness = new this.businessModel(createBusinessDto);
    return createdBusiness.save();
    }

    async update(id: number, updateBusinessDto: UpdateBusinessDto): Promise<BusinessEntity> {
      const updateBusiness = await this.businessModel
        .findByIdAndUpdate(id, updateBusinessDto, { new: true })
        .exec();
      if (!updateBusiness) {
        throw new NotFoundException(`Business with id ${id} not found`);
      }
      return updateBusiness;
    }

    async remove(id: string): Promise<void> {
      const business = await this.businessModel.findOneAndDelete().exec();
      if (!business) {
        throw new NotFoundException(`Business with id ${id} not found`);
      }
    }

}