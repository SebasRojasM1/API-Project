/* eslint-disable prettier/prettier */
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginBusinessDto, RegisterBusinessDto } from '../Dtos/business/index';
import { LoginUserDto, RegisterUserDto } from '../Dtos/users';
import { AuthService } from '../service/auth.service';
import { Body } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('business/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerBusinessDto: RegisterBusinessDto) {
    const token = await this.authService.registerBusiness(registerBusinessDto);
    return { access_token: token.access_token };
  }

  @Post('business/login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() loginBusinessDto: LoginBusinessDto) {
    const token = await this.authService.logInBusiness(loginBusinessDto);
    return { access_token: token.access_token };
  }

  @Post('users/registerUser')
    async registerUser(@Body() registerUserDto:RegisterUserDto){

        await this.authService.registerUser(registerUserDto)
    }

  @Post('users/loginUser')
    async loginUser(@Body() loginUserDto: LoginUserDto){
        
        const userData = await this.authService.loginUser(loginUserDto)
    }


 /*  @Post('check')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async check() {
    return true;
  } */
}
