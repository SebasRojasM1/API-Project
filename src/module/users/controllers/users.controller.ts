import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from 'src/libs/common/enums/rol.enum';
import { RolesGuard } from 'src/libs/auth/guards/auth.guard';
import { Roles } from 'src/libs/decorators';


@ApiTags('Users') 
@ApiBearerAuth() 
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("create")
  @ApiOperation({ summary: 'Create a user to the system.', description: 'Create a user to access the system.' })
  @ApiResponse({status: 201, description: 'User created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the user is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the user.'})
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find all the users of the system.', description: 'View all users registered in the system.' })
  @ApiResponse({status: 200, description: 'All users were found successfully.'})
  @ApiResponse({status: 404, description: 'No users were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the users.'})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find the user by ID of the system.', description: 'View a specific user registered in the database.' })
  @ApiResponse({status: 200, description: 'User found successfully.',})
  @ApiResponse({status: 404, description: 'User with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the user.'})
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch('update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a user to the system.', description: 'Update a specific user registered in the database.' })
  @ApiResponse({status: 200, description: 'User updated successfully.'})
  @ApiResponse({status: 404, description: 'User with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the user.'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a user to the system.', description: 'Delete a user of the system.' })
  @ApiResponse({status: 200, description: 'User deleted successfully.'})
  @ApiResponse({status: 404, description: 'User with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the user.'})
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
