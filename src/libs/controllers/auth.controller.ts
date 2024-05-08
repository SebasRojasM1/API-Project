import { Controller } from "@nestjs/common";
import {loginBusinessDto, registerBusinessDto } from '../Dtos/business/index'
import {loginUserDto, registerUserDto} from '../Dtos/users/index'
import { userEntity, userModel } from "src/module/users/entities/users.entities";
import { authService } from "../service/auth.service";
import { Body } from "@nestjs/common";

@Controller()
export class AuthController {

    constructor(private AuthService: authService){}
    
    registerBusiness(@Body() RegisterBusinessDto:registerBusinessDto ){
        return "Register Business"
    }

    registerUser(@Body() RegisterUserDto:registerUserDto){
        return "Register User"
    }

    loginBusiness(@Body() LoginBusinessDto: loginBusinessDto){
        return "Login Business"
    }

    loginUser(@Body() LoginUserDto: loginUserDto){
        return "Login User"
    }
}