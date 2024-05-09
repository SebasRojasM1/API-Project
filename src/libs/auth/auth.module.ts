import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({})
export class AuthModule {
    imports: [
        PassportModule,
    ]
}
