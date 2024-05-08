/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

@Schema({ timestamps: true })
export class BusinessEntity {
  @Prop({ required: true })
  @IsString()
  businessId: string;

  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  address: string;

  @Prop({ required: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  service: string;

  @Prop({ required: true })
  @Length(10, 50)
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsNumber()
  @Length(8, 10)
  nit: number;

  @Prop({ required: true })
  @IsString()
  @IsUrl()
  img: string;

  @Prop({ required: true })
  @IsString()
  @MinLength(8, {
    message: 'The characters minimun is 8 please complete your password',
  })
  @MaxLength(50, {
    message:
      'The maximun of characters are 50 please reestructure the password',
  })
  password: string;
}

export const businessSchema = SchemaFactory.createForClass(BusinessEntity);
