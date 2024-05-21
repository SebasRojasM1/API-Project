import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from '../../../libs/common/enums/rol.enum';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document{
  @IsString()
  @Prop({ required: true })
  name: string;

  @IsNumber()
  @Prop({ required: true })
  age: number;

  @IsString()
  @Prop({ required: true })
  email: string;

  @IsNumber()
  @Prop({ required: true })
  cellphone: number;

  @IsString()
  @Prop({ required: true })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);