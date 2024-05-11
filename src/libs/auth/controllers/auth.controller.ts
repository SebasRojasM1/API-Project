import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSignUpDto } from '../dto/users/signup-users.dto';
import { BusinessSignUpDto } from '../dto/business/signup-business.dto';
import { UserLoginDto } from '../dto/users/login-users.dto';
import { BusinessLoginDto } from '../dto/business/login-business.dto';

@ApiTags('Auth services.') 
@ApiBearerAuth() 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() userSignUp: UserSignUpDto) {
    const user = await this.authService.registerUsers(userSignUp);

    return { access_token: user.access_token };
  }

  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  async logInUser(@Body() userLogin: UserLoginDto) {
    const user = await this.authService.logInUsers(userLogin);

    return { access_token: user.access_token };
  }


  @Post('business/register')
  @HttpCode(HttpStatus.CREATED)
  async registerBusiness(@Body() BusinessSignUp: BusinessSignUpDto) {
    const business = await this.authService.registerBusiness(BusinessSignUp);

    return { access_token: business.access_token };
  }

  @Post('business/login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() businessLogin: BusinessLoginDto) {
    const business = await this.authService.logInUsers(businessLogin);

    return { access_token: business.access_token };
  }
  
}
