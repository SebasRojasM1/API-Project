/* eslint-disable prettier/prettier */
import { RegisterBusinessDto, LoginBusinessDto } from '../dto/business';
import { RegisterUserDto, LoginUserDto } from '../dto/users';
import { BadRequestException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/module/users/service/user.service';
import { BusinessService } from '../../../module/business/services/business.service';
import { JwtPayload, Tokens } from '../types';
import { HashService } from 'src/libs/hash/service/hash.service';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly businessService: BusinessService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}


  async registerBusiness(businessRegister: RegisterBusinessDto): Promise<Tokens> {
    await this.validationEmailForSignUpBusiness(businessRegister.email);

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

  async registerUser(registerUser: RegisterUserDto): Promise<Tokens> {
    await this.validationEmailForSignUpUsers(registerUser.email);
  
    const hashedPassword = await this.hashService.hash(registerUser.password);
  
    const user = await this.userService.create({
     ...registerUser,
      password: hashedPassword,
    });
  
    return await this.getTokens({
      sub: user.id,
    });
  }
  


  async loginUser(loginUser: LoginUserDto): Promise<Tokens> {
    const user = await this.userService.findOneByEmail(loginUser.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await this.hashService.compare(
      loginUser.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    return await this.getTokens({
      sub: user.id,
    });
  }


  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const secret_key = process.env.JWT_SECRETKEY;
  
    if (!secret_key) {
      throw new Error('Jwt token is not set');
    }
  
    const tokenOptions = {
      expiresIn: process.env.SECRET_TOKEN_EXPIRY || '15m',
    };
  
    const accessToken = await this.signToken(
      jwtPayload,
      secret_key,
      tokenOptions,
    );
  
    return { access_token: accessToken };
  }

  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }

  async validationEmailForSignUpUsers(email: string): Promise<boolean | undefined> {
    const validationUser = await this.userService.findOneByEmail(email);

    if (validationUser) {
      throw new BadRequestException(
        'This email is already use please enter another email',
      );
    }
    return true;
  }

  async validationEmailForSignUpBusiness(email: string): Promise<boolean | undefined> {
    const validationBusiness = await this.businessService.findOneByEmail(email);

    if (validationBusiness) {
      throw new BadRequestException(
        'Email has already exists please try with another email',
      );
    }

    return true;
  }
}
