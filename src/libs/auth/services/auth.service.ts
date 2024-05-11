import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../utils/services/hash.service';
import { BusinessService } from '../../../module/business/services/business.service';
import { UsersService } from '../../../module/users/services/users.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly businessService: BusinessService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}


}