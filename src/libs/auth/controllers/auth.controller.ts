/* eslint-disable prettier/prettier */
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginBusinessDto, RegisterBusinessDto } from '../Dtos/business/index';
/* import { loginUserDto, registerUserDto } from '../Dtos/users/index';*/
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


 /*  @Post('check')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async check() {
    return true;
  } */
}
