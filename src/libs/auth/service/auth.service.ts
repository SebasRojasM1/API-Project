/* eslint-disable prettier/prettier */
import { RegisterBusinessDto, LoginBusinessDto } from '../Dtos/business/index';
import { RegisterUserDto, LoginUserDto } from '../Dtos/users';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userService } from '../../../module/users/service/user.service';
import { BusinessService } from '../../../module/business/services/business.service';
import { accessToken, JwtPayload } from '../types/index';
import { HashService } from '../../hash/services/hash.service';

export class AuthService {
  constructor(
    private readonly UserService: userService,
    private readonly businessService: BusinessService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}


  async registerBusiness(businessRegister: RegisterBusinessDto): Promise<accessToken> {
    await this.validationEmailForSignUp(businessRegister.email);

    const hashedPassword = await this.hashService.hash(businessRegister.password);

    const business = await this.businessService.create({
      ...businessRegister,
      password: hashedPassword,
    });

    return await this.getTokens({
      sub: business.id,
    });
  }

  async logInBusiness(loginBusinessDto: LoginBusinessDto) {
    const business = await this.businessService.findOneByEmail(loginBusinessDto.email);
    if (!business) {
      throw new BadRequestException('Business not found');
    }

    const isPasswordValid = await this.hashService.compare(
      loginBusinessDto.password,
      business.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    return await this.getTokens({
      sub: business.id,
    });
  }

  async registerUser(registerUserDto: RegisterUserDto){

    const validation =  await this.validationEmailForSignUp(registerUserDto.email)

    if(validation == true){

     const {password} = registerUserDto

     const newUserDto = {
      ...registerUserDto, 
      password: await bcrypt.hash(password, 10)
    } 

     const newUserWithModel = new this.userModel(newUserDto)

     await this.UserService.create(newUserWithModel)

     return(HttpStatus.ACCEPTED)

    }
 }

 async loginUser({email, password}: LoginUserDto){

     const user = await this.UserService.findOneByEmail(email)

     if(!user){
         throw new BadRequestException("User not found")
     }

     const isPasswordValid = await this.hashService.compare(password, user.password)

     if(!isPasswordValid){
         throw new HttpException('Incorrect email or password', HttpStatus.FORBIDDEN)
     }
 }



  async validationEmailForSignUp(email: string): Promise<boolean | undefined> {
    const validation = this.UserService.findOneByEmail(email);

    if (validation) {
      throw new BadRequestException(
        'This email is already use please enter another email',
      );
    }
    return true;
  }

  async getTokens(jwtPayload: JwtPayload): Promise<accessToken> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not set');
    }
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };

    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    return { access_token: accessToken };
  }

  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }
}
