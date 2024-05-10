/* eslint-disable prettier/prettier */
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginBusinessDto, RegisterBusinessDto } from "../dto/business";
import { LoginUserDto, RegisterUserDto } from '../dto/users';
import { AuthService } from '../service/auth.service';
import { Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';
// import { AtGuard } from '../guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AtGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('business/register')
  async registerBusiness(@Body() registerBusinessDto: RegisterBusinessDto) {
    const token = await this.authService.registerBusiness(registerBusinessDto);
    return { access_token: token.access_token };
  }

  // @UseGuards(AuthGuard)
  //@Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Post('business/login')
  async logInBusiness(@Body() loginBusinessDto: LoginBusinessDto) {
    const token = await this.authService.logInBusiness(loginBusinessDto);
    return { access_token: token.access_token };
  }


  @Post('user/register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() registerUser: RegisterUserDto) {
    const token = await this.authService.registerUser(registerUser);
    return { access_token: token.access_token };
  }

  @Post('login/user')
  @HttpCode(HttpStatus.OK)
  async logInUser(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.logInBusiness(loginUserDto);
    return { access_token: token.access_token };
  }


  @Post('check')
  // @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async check() {
    return true;
  }
}