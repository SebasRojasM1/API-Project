import { registerBusinessDto } from '../Dtos/business';
import { userService } from 'src/module/service/user.service';
import { businessService } from 'src/module/business/services/business.service';
import { accessToken, jwtPayload } from '../types/index';
import bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { registerUserDto } from '../Dtos/users';
import { v4 as uuidv4 } from 'uuid';

export class authService {
  constructor(
    private UserService: userService,
    private BusinessService: businessService,
  ) {}

  async registerBusiness({
    name,
    address,
    email,
    service,
    description,
    nit,
    img,
    password,
  }: registerBusinessDto) {
    await this.validationEmailForSignUp(email);

    const newBusiness = await this.BusinessService.create({
      businessId: uuidv4(),
      name,
      address,
      email,
      service,
      description,
      nit,
      img,
      password: await bcrypt.hash(password, 10),
    });
  }

  loginBusiness() {}

  async registerUser({
    userId,
    name,
    age,
    cellphone,
    email,
    password,
  }: registerUserDto) {
    await this.validationEmailForSignUp(email);

    const newUser = await this.UserService.create({
      userId,
      name,
      age,
      cellphone,
      email,
      password: await bcrypt.hash(password, 10),
    });
  }

  loginUser() {}

  async validationEmailForSignUp(email: string): Promise<Boolean | undefined> {
    const validation = this.UserService.findOneByEmail(email);

    if (validation) {
      throw new BadRequestException(
        'This email is already use please enter another email',
      );
    }

    return true;
  }

  //     getToken(jwtPayload: Jwtpayload): Promise<accessToken>{

  //     }
}
