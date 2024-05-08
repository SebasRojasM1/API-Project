import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty()
  businessId: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsString()
  hour: string;

  @ApiProperty()
  @IsString()
  service: string;

  @ApiProperty()
  @IsString()
  price: string;
}
