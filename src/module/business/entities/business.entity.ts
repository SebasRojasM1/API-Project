import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString, Length } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Business extends Document {

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({ required: true })
  address: string;

  @IsString()
  @Prop({ required: true })
  email: string;

  @IsString()
  @Prop({ required: true })
  service: string;

  @IsString()
  @Prop({ required: true })
  description: string;

  @IsNumber()
  @Prop({ required: true })
  @Length(8, 15)
  nit: number;

  @IsString()
  @Prop({ required: true })
  urlImg: string;

  @IsString()
  @Length(8, 25)
  @Prop({ required: true })
  password: string;
  role: string;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);