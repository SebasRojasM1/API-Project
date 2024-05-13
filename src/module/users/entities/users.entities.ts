import { IsString, IsEmail, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class User extends Document {
  @ApiProperty()
  @Prop({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsString()
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNumber()
  age: number;

  @ApiProperty()
  @Prop({ required: true })
  @IsString()
  cellphone: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsString()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);

