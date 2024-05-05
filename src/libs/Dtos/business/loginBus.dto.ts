import { IsString } from "class-validator";
import { Prop } from "@nestjs/mongoose";


export class loginBusinessDto {

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