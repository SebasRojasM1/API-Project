import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUser: CreateUserDto): Promise<User> {
    const userExist = await this.userModel
      .findOne({ email: createUser.email })
      .exec();

    if (userExist) {
      throw new HttpException(
        `User with email ${createUser.email} already exists`,
        HttpStatus.BAD_REQUEST, 
      );
    }

    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`The user with the id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(
        `The user with email ${email} it´s not found`,
      );
    }
    return user;
  }

  async updateUser(id: string, updateUser: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUser, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`The user with id ${id} it´s not found. Try again.`);
    }
    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findOneAndDelete().exec();
    if (!deletedUser) {
      throw new NotFoundException(`The user with id ${id} it´s not found. Try again.`);
    }

    return deletedUser;
  }
}
