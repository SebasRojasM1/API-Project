import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/module/users/users.module';
import { UtilsModule } from '../utils/utils.module';
import { BusinessModule } from 'src/module/business/business.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/at.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    //Jwt Module configuration with specific options 
    JwtModule.register({ 
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }, 
    }),
    UtilsModule,
    UsersModule,
    BusinessModule,
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
