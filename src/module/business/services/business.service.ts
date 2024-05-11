import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business } from '../entities/business.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
  ) {}

  async create(CreateBusiness: CreateBusinessDto): Promise<Business> {
    const businessExist = await this.businessModel
      .findOne({ email: CreateBusiness.email })
      .exec();

    if (businessExist) {
      throw new HttpException(
        `User with email ${CreateBusiness.email} already exists`,
        HttpStatus.BAD_REQUEST, 
      );
    }

    const createdBusiness = new this.businessModel(CreateBusiness);
    return createdBusiness.save();
  }

  findAll(): Promise<Business[]> {
    return this.businessModel.find().exec();
  }

  async findOne(id: string): Promise<Business> {
    const business = await this.businessModel.findById(id).exec();
    if (!business) {
      throw new NotFoundException(`The business with the id ${id} not found`);
    }
    return business;
  }

  async findOneByEmail(email: string): Promise<Business> {
    const business = await this.businessModel.findOne({ email }).exec();
    if (!business) {
      throw new NotFoundException(
        `The business with email ${email} it´s not found`,
      );
    }
    return business;
  }

  async findOneByEmailRegister(email: string): Promise<Business> {
    const business = await this.businessModel.findOne({ email }).exec();
    if (business) {
      throw new NotFoundException(`The business with email ${email} already exists. Try again.`);
    }
    return business;
  }

  async updateBusiness(id: string, updateBusiness: UpdateBusinessDto): Promise<Business> {
    const updatedBusiness = await this.businessModel
      .findByIdAndUpdate(id, updateBusiness, { new: true })
      .exec();
    if (!updatedBusiness) {
      throw new NotFoundException(`The business with id ${id} it´s not found. Try again.`);
    }
    return updatedBusiness;
  }

  async deleteBusiness(id: string): Promise<void> {
    const business = await this.businessModel.findOneAndDelete().exec();
    if (!business) {
      throw new NotFoundException(`The business with id ${id} it´s not found. Try again.`);
    }
  }
}
