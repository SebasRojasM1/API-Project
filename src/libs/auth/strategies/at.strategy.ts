/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BusinessJwtPayload, JwtPayload, UserJwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    if (payload.type === 'user') {
      const userPayload: UserJwtPayload = {
        ...payload,
        age: payload['age'],
        cellphone: payload['cellphone'],
      };
      return userPayload;
    } else if (payload.type === 'business') {
      const businessPayload: BusinessJwtPayload = {
        ...payload,
        address: payload['address'],
        service: payload['service'],
        description: payload['description'],
        nit: payload['nit'],
        img: payload['img'],
      };
      return businessPayload;
    }
    return payload;
  }
}
