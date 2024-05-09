import { Controller } from "@nestjs/common";
import { loginBusinessDto, registerBusinessDto } from "src/libs/Dtos/business";
import { registerUserDto } from "src/libs/Dtos/users";
import { loginUserDto } from "src/libs/Dtos/users";
import { authService } from "../service/auth.service";
import { Body, Post, Get } from "@nestjs/common";
import { Tokens } from "src/libs/types";


@Controller('auth')
export class AuthController {

    constructor(private AuthService: authService){}
    
    @Post('/registerBusiness')
    async registerBusiness(@Body() RegisterBusinessDto:registerBusinessDto): Promise<registerBusinessDto>{

            return await this.AuthService.registerBusiness(RegisterBusinessDto)
    }

    @Post('/registerUser')
    async registerUser(@Body() RegisterUserDto:registerUserDto): Promise<registerUserDto>{

        return await this.AuthService.registerUser(RegisterUserDto) 
    }

    @Post('/loginBusiness')
    async loginBusiness(@Body() LoginBusinessDto: loginBusinessDto): Promise<Tokens>{
       
        return await this.AuthService.loginBusiness(LoginBusinessDto) 
    }

    @Post('/loginUser')
    async loginUser(@Body() LoginUserDto: loginUserDto): Promise<Tokens>{
    
        return await this.AuthService.loginUser(LoginUserDto)

    }
}