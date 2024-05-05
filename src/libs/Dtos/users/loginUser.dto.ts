import { IsString } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export class loginUserDto {

    @Prop()
    @IsString()
    name: string

    @Prop()
    @IsString()
    email: string

    @Prop()
    @IsString()
    password: string
    
}