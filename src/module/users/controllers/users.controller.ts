import { Controller, Get, Post, Body, Param, Delete, Put, Patch} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';


@ApiTags('Users') 
@ApiBearerAuth() 
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("create")
  @ApiResponse({status: 201, description: 'Usuario creado correctamente.'})
  @ApiResponse({status: 400, description: 'Los datos ingresados para crear el usuario son inválidos.'})
  @ApiResponse({status: 500, description: 'Se ha producido un error interno del servidor al crear el usuario.'})
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Get()
  @ApiResponse({status: 200, description: 'Todos los usuarios fueron encontrados correctamente.'})
  @ApiResponse({status: 404, description: 'No se encontraron usuarios en el sistema.'})
  @ApiResponse({status: 500,description: 'Se ha producido un error interno del servidor al buscar los usuarios.'})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'Usuario encontrado correctamente.',})
  @ApiResponse({status: 404, description: 'No se encontró el usuario con el ID ingresado.'})
  @ApiResponse({status: 500, description: 'Se ha producido un error interno del servidor al buscar el usuario.'})
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch('update/:id')
  @ApiResponse({status: 200, description: 'Usuario actualizado correctamente.'})
  @ApiResponse({status: 404, description: 'No se encontró el usuario con el ID ingresado.'})
  @ApiResponse({status: 500, description: 'Se ha producido un error interno del servidor al actualizar el usuario.'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiResponse({status: 200, description: 'Usuario eliminado correctamente.'})
  @ApiResponse({status: 404, description: 'No se encontró el usuario con el ID ingresado.'})
  @ApiResponse({status: 500, description: 'Se ha producido un error interno del servidor al eliminar el usuario.'})
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
