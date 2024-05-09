import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from '../hash/utils.module';
import { JwtStrategy } from './strategies/at.strategy';
import { AuthService } from './service/auth.service'
import { UsersModule } from '../../module/users/users.module';
import { BusinessModule } from 'src/module/business/business.module';
import { HashService } from '../hash/service/hash.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' },
    }),
    UtilsModule,
    UsersModule,
    BusinessModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, HashService],
})
export class AuthModule {}
