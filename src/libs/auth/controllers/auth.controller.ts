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
  //SWAGGER DOCUMENTATION

  //Swagger documentation about the process
  @ApiOperation({ summary: 'Register a user to the system.', description: 'Register a user to access the system and its services.' })

  //Errors documentation 
  @ApiResponse({ status: 201, description: 'User registration was successful.' })
  @ApiResponse({ status: 400, description: 'The registration data entered is invalid.' })
  @ApiResponse({ status: 409, description: 'Account already exists.' })
  @ApiResponse({ status: 500, description: 'An internal server error has occurred.' })

  //Swagger documentation about specification of the expected data type
  @ApiBody({ description: 'Data of the user to be created', type: UserSignUpDto })
  
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() userSignUp: UserSignUpDto) {
    const user = await this.authService.registerUsers(userSignUp);

    return { access_token: user.access_token };
  }

  @Post('user/login')
  //SWAGGER DOCUMENTATION
  //Swagger documentation about the process
  @ApiOperation({ summary: 'Log in with a previously registered user.', description: 'Generates access to the system through a previously registered user.' })

  //Errors documentation 
  @ApiResponse({ status: 200, description: 'Successful login.' })
  @ApiResponse({ status: 400, description: 'The data entered is invalid.' })
  @ApiResponse({ status: 404, description: 'The user is not registered.' })
  @ApiResponse({ status: 500, description: 'An internal server error has occurred.' })
  
   //Swagger documentation about specification of the expected data type
  @ApiBody({ description: 'Data of the user to be logged', type: UserLoginDto })
  @HttpCode(HttpStatus.OK)
  async logInUser(@Body() userLogin: UserLoginDto) {
    const user = await this.authService.logInUsers(userLogin);

    return { access_token: user.access_token };
  }


  @Post('business/register')
  //SWAGGER DOCUMENTATION
  //Swagger documentation about the process
  @ApiOperation({ summary: 'Register a business to the system.', description: 'Register a business to access the system and offer its services to customers.' })

 //Errors documentation 
  @ApiResponse({ status: 201, description: 'Business registration was successful.' })
  @ApiResponse({ status: 400, description: 'The registration data entered is invalid.' })
  @ApiResponse({ status: 409, description: 'Account already exists.' })
  @ApiResponse({ status: 500, description: 'An internal server error has occurred.' })

  //Swagger documentation about specification of the expected data type
  @ApiBody({ description: 'Data of the business to be created', type: BusinessSignUpDto })

  @HttpCode(HttpStatus.CREATED)
  async registerBusiness(@Body() BusinessSignUp: BusinessSignUpDto) {
    const business = await this.authService.registerBusiness(BusinessSignUp);

    return { access_token: business.access_token };
  }

  @Post('business/login')

  //SWAGGER DOCUMENTATION
  //Swagger documentation about the process
  @ApiOperation({ summary: 'Log in with a previously registered business account.', description: 'Generates access to the system through a previously registered business.' })
 
  //Errors documentation 
  @ApiResponse({ status: 200, description: 'Successful login.' })
  @ApiResponse({ status: 400, description: 'The information entered is invalid.' })
  @ApiResponse({ status: 404, description: 'The business is not registered.' })
  @ApiResponse({ status: 500, description: 'An internal server error has occurred.' })

  //Swagger documentation about specification of the expected data type
  @ApiBody({ description: 'Data of the business to be logged', type: BusinessLoginDto })

  @HttpCode(HttpStatus.OK)
  async logIn(@Body() businessLogin: BusinessLoginDto) {
    const business = await this.authService.logInBusiness(businessLogin);

    return { access_token: business.access_token };
  }
  
}