import { Controller, Get, Post, Body, Param, Delete, Put} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


@ApiTags('Users') 
@ApiBearerAuth() 
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("create")
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
