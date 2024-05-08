import { IsString } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export class LoginUserDto {
    @IsString()
    email: string

    @IsString()
    password: string
}