import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

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
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  service: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 50)
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Length(8, 15)
  nit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  img: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'The characters minimum is 8. Please complete your password',
  })
  @MaxLength(25, {
    message:
      'The maximum characters allowed are 25. Please restructure the password',
  })
  password: string;
}
