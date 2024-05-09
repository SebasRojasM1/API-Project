import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { loginBusinessDto, registerBusinessDto } from 'src/libs/Dtos/business/index';
import { loginUserDto, registerUserDto} from 'src/libs/Dtos/users/index';
import { Tokens} from 'src/libs/types';
import { AuthService } from '../service/auth.service';
import { Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { AtGuard } from '../guards/roles.guard';
import { Roles } from 'src/libs/decorators';
import { Role } from 'src/libs/common/enums/rol.enum';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    
    // @UseGuards(AtGuard)
    @Roles(Role.ADMIN)
    @Post('business/register')
    async registerBusiness(@Body() RegisterBusinessDto:registerBusinessDto): Promise<registerBusinessDto>{

            return await this.authService.registerBusiness(RegisterBusinessDto)
    }

    // @UseGuards(AuthGuard)
    @Roles(Role.ADMIN)
    @Post('business/login')
    async loginBusiness(@Body() LoginBusinessDto: loginBusinessDto): Promise<Tokens>{
       
        return await this.authService.loginBusiness(LoginBusinessDto) 
    }
    
    @Post('user/register')
    async registerUser(@Body() RegisterUserDto:registerUserDto): Promise<registerUserDto>{

        return await this.authService.registerUser(RegisterUserDto) 
    }

    @Post('login/user')
    async loginUser(@Body() LoginUserDto: loginUserDto): Promise<Tokens>{
    
        return await this.authService.loginUser(LoginUserDto)

    }

    @Post('check')
    // @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    async check() {
        return true;
    }
}