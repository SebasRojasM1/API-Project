
import { IsString, MinLength, IsEmail, Length } from "class-validator";
export class loginBusinessDto {

    @IsString()
    @Length(3, 50)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
    
}