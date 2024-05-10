import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/users.entities';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) protected userModel: Model<User>) {}

  async findAll() {
    return this.userModel.find();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDto) {
    const existingBusiness = await this.userModel
      .findOne({ id: createUserDto.id })
      .exec();

    if (existingBusiness) {
      throw new HttpException(
        `The business with ID ${createUserDto.id} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdBusiness = new this.userModel(createUserDto);
    return createdBusiness.save();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updateUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updateUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userModel.findOneAndDelete().exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
