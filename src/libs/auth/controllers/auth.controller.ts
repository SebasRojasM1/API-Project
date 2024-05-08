import { Controller } from "@nestjs/common";
import { loginBusinessDto, registerBusinessDto } from "src/libs/Dtos/business";
import { registerUserDto } from "src/libs/Dtos/users";
import { loginUserDto } from "src/libs/Dtos/users";
import { authService } from "../service/auth.service";
import { Body, Post, Get } from "@nestjs/common";


@Controller()
export class AuthController {

    constructor(private AuthService: authService){}
    
    @Post('/registerBusiness')
    async registerBusiness(@Body() RegisterBusinessDto:registerBusinessDto ){
        
        await this.AuthService.registerBusiness(RegisterBusinessDto)
        
    }

    @Post('/registerUser')
    async registerUser(@Body() RegisterUserDto:registerUserDto){

        await this.AuthService.registerUser(RegisterUserDto)
    }

    @Post('/loginBusiness')
    async loginBusiness(@Body() LoginBusinessDto: loginBusinessDto){

        const dataBusiness = this.AuthService.loginBusiness(LoginBusinessDto)
        return 
    }

    @Post('/loginUser')
    async loginUser(@Body() LoginUserDto: loginUserDto){
        
        const userData = await this.AuthService.loginUser(LoginUserDto)
    }


 /*  @Post('check')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async check() {
    return true;
  } */
}
