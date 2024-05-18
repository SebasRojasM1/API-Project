/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../utils/services/hash.service';
import { BusinessService } from '../../../module/business/services/business.service';
import { UsersService } from '../../../module/users/services/users.service';
import { JwtPayload, Tokens } from '../types';
import { UserSignUpDto } from '../dto/users/signup-users.dto';
import { UserLoginDto } from '../dto/users/login-users.dto';
import { BusinessLoginDto } from '../dto/business/login-business.dto';
import { BusinessSignUpDto } from '../dto/business/signup-business.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly businessService: BusinessService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async logInUsers(UserLogin: UserLoginDto) {
    
    /*Find the registered account through email*/
    const user = await this.userService.findOneByEmail(UserLogin.email);
    if (!user) {
      throw new BadRequestException('User not found. Try again.');
    }

    /*The hashed password is deshashed for do the comparison with the password typed in the Log In*/
    const isPasswordValid = await this.hashService.compare(
      UserLogin.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password. Try again.');
    }

    /*The token is return with all the configs generated in the other services 
    and is created as of the business id*/
    return await this.getTokens({
      sub: user.id,
    });
  }
  
  async registerUsers(userSignUp: UserSignUpDto): Promise<Tokens> {

    /*confirmation that user email doesn't exist */
    await this.validateEmailForSignUpUsers(userSignUp.email);

    const hashedPassword = await this.hashService.hash(userSignUp.password);

    const user = await this.userService.create({
      ...userSignUp, 
      password: hashedPassword,
    });

    //return token
    return await this.getTokens({
      sub: user.id,
    });
  }

  async logInBusiness(businessLogin: BusinessLoginDto) {

      /*Find the registered account through email*/
      const business = await this.businessService.findOneByEmail(businessLogin.email);
      
      if (!business) {
        throw new BadRequestException('Business not found. Try again.');
      }
      /*The hashed password is deshashed for do the comparison with the password typed in the Log In*/
      const isPasswordValid = await this.hashService.compare(
        businessLogin.password,
        business.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Incorrect password. Try again.');
      }

      /*The token is return with all the configs generated in the other services 
      and is created as of the business id*/
      return await this.getTokens({
        sub: business.id,
      });
  }

  async registerBusiness(BusinessSignUp: BusinessSignUpDto): Promise<Tokens> {

      /*confirmation that business email doesn't exist */
      const validate = await this.validateEmailForSignUpBusiness(BusinessSignUp.email);

      if (validate == true){
          const hashedPassword = await this.hashService.hash(BusinessSignUp.password);

        const business = await this.businessService.create({
          ...BusinessSignUp, 
          password: hashedPassword,
          img: BusinessSignUp.img, /*the necessary URL for assign the business image in the register*/
        });
        /*The token is return with all the configs generated in the other services 
        and is created as of the business id*/
        return await this.getTokens({
          sub: business.id,
        });
      }
  }


  /*generation and return token, the token is return with the configuration and the sign*/
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

    /*The token sign with the payload generated, we assign the payload, secret key and other 
    neccesarys configs for the develop of the strategy*/
    async signToken(payload: JwtPayload, secretKey: string, options: any) {
      return await this.jwtService.signAsync(payload, {
        secret: secretKey,
        ...options, 
      });
    }
    /*Email validation for that the email dont repeat in the business collection and dont generate conflicts 
    in the requests*/
    async validateEmailForSignUpBusiness(email: string): Promise<boolean | undefined> {

      const business = await this.businessService.findOneByEmailRegister(email);

      if (business) {
        throw new HttpException('The email already exists! Try again.', 400);
      }

      return true;
    }

    /*Email validation for that the email dont repeat in the user collection and dont generate conflicts 
    in the requests*/
    async validateEmailForSignUpUsers(email: string): Promise<boolean | undefined> {

      const user = await this.userService.findOneByEmailRegister(email);

      if (user) {
        throw new HttpException('The email already exists! Try again.', 400);
      }
      return true;
    }
}
