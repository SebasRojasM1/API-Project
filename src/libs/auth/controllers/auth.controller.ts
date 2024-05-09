/* eslint-disable prettier/prettier */
import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LoginBusinessDto, RegisterBusinessDto } from '../Dtos/business/index';
import { LoginUserDto, RegisterUserDto } from '../Dtos/users';
import { AuthService } from '../service/auth.service';
import { Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guard/roles.guard';
import { Roles } from 'src/libs/decorators';
import { Role } from 'src/libs/common/enums/rol.enum';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Post('business/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerBusinessDto: RegisterBusinessDto) {
    const token = await this.authService.registerBusiness(registerBusinessDto);
    return { access_token: token.access_token };
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
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


  @Post('check')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async check() {
    return true;
  }
}
  