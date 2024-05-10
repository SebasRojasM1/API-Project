import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class RegisterBusinessDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  businessId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  service: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 50)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Length(8, 10)
  nit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  img: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}