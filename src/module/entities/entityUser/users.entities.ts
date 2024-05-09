import { IsString, IsEmail, IsNumber, IsUUID } from "class-validator";
import { Document } from "mongoose";
import { Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { SchemaFactory } from "@nestjs/mongoose";


@Schema({collection: 'users', timestamps: true})
export class userSchema extends Document{
    
    @ApiProperty()
    @IsUUID()
    userId?: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    age: number

    @ApiProperty()
    @IsString()
    cellphone: string

    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export const userModel = SchemaFactory.createForClass(userSchema)
userModel.set('autoCreate', true);