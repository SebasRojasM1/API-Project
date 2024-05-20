import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserSignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'The name must be at least 2 characters long' })
  @MaxLength(50, { message: 'The name must be at most 50 characters long' })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cellphone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Invalid Password',
  })
  @MinLength(8, {
    message: 'The characters minimum is 8. Please complete your password',
  })
  @MaxLength(25, {
    message:
      'The maximum characters allowed are 25. Please restructure the password',
  })
  @Transform(({ value }) => value.toLowerCase())
  password: string;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? 'user')
  role: string  = 'user';
}
