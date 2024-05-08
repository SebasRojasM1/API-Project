import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsNumber, IsUrl, MinLength, MaxLength } from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty()
  @IsString()
  businessId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  service: string;

  @ApiProperty()
  @Length(10, 50)
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Length(8, 10)
  nit: number;

  @ApiProperty()
  @IsString()
  @IsUrl()
  img: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, {
    message: 'The characters minimum is 8 please complete your password',
  })
  @MaxLength(50, {
    message:
      'The maximum characters allowed are 50 please restructure the password',
  })
  password: string;
  
}
