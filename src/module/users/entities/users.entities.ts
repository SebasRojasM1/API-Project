import { IsString, IsEmail, IsNumber, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class userEntity{

    @ApiProperty()
    @IsUUID()
    userId?: string;

    @ApiProperty()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsNumber()
    age?: number

    @ApiProperty()
    @IsString()
    cellphone?: string

    @ApiProperty()
    email?: string;

    @ApiProperty()
    @IsString()
    password?: string;

}

export const userModel = SchemaFactory.createForClass(userEntity)