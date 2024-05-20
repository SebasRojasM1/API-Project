/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../utils/services/hash.service';
import { BusinessService } from '../../../module/business/services/business.service';
import { UsersService } from '../../../module/users/services/users.service';
import { BusinessJwtPayload, JwtPayload, Tokens, UserJwtPayload } from '../types';
import { UserSignUpDto } from '../dto/users/signup-users.dto';
import { UserLoginDto } from '../dto/users/login-users.dto';
import { BusinessLoginDto } from '../dto/business/login-business.dto';
import { BusinessSignUpDto } from '../dto/business/signup-business.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly businessService: BusinessService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly httpService: HttpService
  ) {}

  async sendDataToJava(data: any, url: string): Promise<string> {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error sending data to Spring Boot: ${error.message}`);
    }
  }

  async logInUsers(UserLogin: UserLoginDto) {
    const user = await this.userService.findOneByEmail(UserLogin.email);
    if (!user) {
      throw new BadRequestException('User not found. Try again.');
    }

    const isPasswordValid = await this.hashService.compare(
      UserLogin.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password. Try again.');
    }
        

    const userPayload: UserJwtPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      cellphone: user.cellphone,
      role: user.role,
      type: 'user',
    };

    return await this.getTokens(userPayload);
  }
  
  async registerUsers(userSignUp: UserSignUpDto): Promise<Tokens> {

    try {

      await this.validateEmailForSignUpUsers(userSignUp.email);

      const user = await this.userService.create({
        ...userSignUp
      });
          
      const userPayload: UserJwtPayload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        cellphone: user.cellphone,
        role: user.role,
        type: 'user',
      };
  
      const urlUserJava = 'http://localhost:3000/register/user/java'
  
      const tokens = await this.getTokens(userPayload);
  
      await this.sendDataToJava( {...userPayload, password: userSignUp.password, token: tokens.access_token }, urlUserJava)
  
      return tokens;

    } catch(error){

      console.error(`Error getting and sendint the data to the database ${error}`)
    }
  }

  async logInBusiness(businessLogin: BusinessLoginDto) {
    const business = await this.businessService.findOneByEmail(businessLogin.email);
    if (!business) {
      throw new BadRequestException('Business not found. Try again.');
    }

    const isPasswordValid = await this.hashService.compare(
      businessLogin.password,
      business.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password. Try again.');
    }

    const businessPayload: BusinessJwtPayload = {
      sub: business.id,
      name: business.name,
      email: business.email,
      address: business.address,
      service: business.service,
      description: business.description,
      nit: business.nit,
      img: business.img,
      role: business.role,
      type: 'business',
    };

    return await this.getTokens(businessPayload);
  }
  
  async registerBusiness(BusinessSignUp: BusinessSignUpDto): Promise<Tokens> {

    try{

      await this.validateEmailForSignUpBusiness(BusinessSignUp.email);

      const hashedPassword = await this.hashService.hash(BusinessSignUp.password);

      const business = await this.businessService.create({
        ...BusinessSignUp, 
        password: hashedPassword,
        img: BusinessSignUp.img, // Asegúrate de incluir la URL de la imagen
      });

      const businessPayload: BusinessJwtPayload = {
        sub: business.id,
        name: business.name,
        email: business.email,
        address: business.address,
        service: business.service,
        description: business.description,
        nit: business.nit,
        img: business.img,
        role: business.role,
        type: 'business',
      };

      const urlBusinessJava = 'http://localhost:3000/register/business/java'

      const tokens = await this.getTokens(businessPayload);

      await this.sendDataToJava( {...businessPayload, password: BusinessSignUp.password, token: tokens.access_token }, urlBusinessJava)

      return tokens;
    } catch(error){
      console.error(`Error getting and sending the data to the databases ${error}`)
    }
  }

  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('SECRET_KEY is not set');
    }

    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '20m',
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

  async validateEmailForSignUpBusiness(email: string): Promise<boolean | undefined> {
    const business = await this.businessService.findOneByEmailRegister(email);

    if (business) {
      throw new HttpException('The email already exists! Try again.', 400);
    }
    return true;
  }

  async validateEmailForSignUpUsers(email: string): Promise<boolean | undefined> {
    const user = await this.userService.findOneByEmailRegister(email);

    if (user) {
      throw new HttpException('The email already exists! Try again.', 400);
    }
    return true;
  }
}
