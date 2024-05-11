import { Controller, Post, Body, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSignUpDto } from '../dto/users/signup-users.dto';
import { BusinessSignUpDto } from '../dto/business/signup-business.dto';
import { UserLoginDto } from '../dto/users/login-users.dto';
import { BusinessLoginDto } from '../dto/business/login-business.dto';
import { LoggingInterceptor} from '../../common/interceptor/logging.interceptor';

@ApiTags('Auth services.') 
@ApiBearerAuth()
@UseInterceptors(LoggingInterceptor) 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  @ApiOperation({ summary: 'Registrar una usuario al sistema.', description: 'Registrar una usuario para acceder al sistema y a sus servicios.' })
  @ApiResponse({ status: 201, description: 'El registro del usuario ha sido exitoso.'})
  @ApiResponse({ status: 401, description: 'Los datos de registro ingresados son invalidos.' })
  @ApiResponse({ status: 404, description: 'Cuenta ya existente.' })
  @ApiResponse({ status: 500, description: 'Se ha producido un error interno del servidor.' })
  @ApiBody({ description: 'Datos del usuario a crear', type: UserSignUpDto })
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() userSignUp: UserSignUpDto) {
    const user = await this.authService.registerUsers(userSignUp);

    return { access_token: user.access_token };
  }

  @Post('user/login')
  @ApiOperation({ summary: 'Ingresar con el usuario previamente registrado.', description: 'Se genera el acceso al sistema por medio de un usuario previamente registrado.' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.'})
  @ApiResponse({ status: 400, description: 'Los datos ingresados son invalidos.' })
  @ApiResponse({ status: 404, description: 'El usuario no se encuentra registrado.' })
  @ApiResponse({ status: 500, description: 'Se ha producido un error interno del servidor.' })
  @HttpCode(HttpStatus.OK)
  async logInUser(@Body() userLogin: UserLoginDto) {
    const user = await this.authService.logInUsers(userLogin);

    return { access_token: user.access_token };
  }


  @Post('business/register')
  @ApiOperation({ summary: 'Registrar una empresa al sistema.', description: 'Registrar una empresa para acceder al sistema y ofrecer sus servicios a los clientes.' })
  @ApiResponse({ status: 201, description: 'El registro de la empresa ha sido exitoso.'})
  @ApiResponse({ status: 401, description: 'Los datos de registro ingresados son invalidos.' })
  @ApiResponse({ status: 404, description: 'Cuenta ya existente.' })
  @ApiResponse({ status: 500, description: 'Se ha producido un error interno del servidor.' })
  @HttpCode(HttpStatus.CREATED)
  async registerBusiness(@Body() BusinessSignUp: BusinessSignUpDto) {
    const business = await this.authService.registerBusiness(BusinessSignUp);

    return { access_token: business.access_token };
  }

  @Post('business/login')
  @ApiOperation({ summary: 'Ingresar con la cuenta de la empresa previamente registrada.', description: 'Se genera el acceso al sistema por medio de una empresa previamente registrada.' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.'})
  @ApiResponse({ status: 400, description: 'Información ingresada es invalida.' })
  @ApiResponse({ status: 404, description: 'La empresa no se encuentra registrada.' })
  @ApiResponse({ status: 500, description: 'Se ha producido un error interno del servidor.' })
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() businessLogin: BusinessLoginDto) {
    const business = await this.authService.logInUsers(businessLogin);

    return { access_token: business.access_token };
  }
  
}
