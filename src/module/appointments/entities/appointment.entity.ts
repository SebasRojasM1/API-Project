import { IsString, IsUUID, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Appointment extends Document {
  @ApiProperty()
  @IsUUID()
  @Prop()
  appointmentId: string;

  @ApiProperty()
  @Prop()
  businessId: string;

  @ApiProperty()
  @IsString()
  @Prop()
  userId: string;

  @ApiProperty()
  @IsString()
  @Prop()
  address: string;

  @ApiProperty()
  @IsDate()
  @Prop()
  date: Date;

  @ApiProperty()
  @Prop()
  hour: string;

  @ApiProperty()
  @IsString()
  @Prop()
  service: string;

  @ApiProperty()
  @IsString()
  @Prop()
  price: string;
}

export const appointmentModel = SchemaFactory.createForClass(Appointment);
