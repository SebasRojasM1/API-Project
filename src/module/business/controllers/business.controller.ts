import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Business') 
@ApiBearerAuth() 
@Controller('/business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post("/create")
  @ApiResponse({status: 201, description: 'Empresa creada correctamente.'})
  @ApiResponse({status: 400, description: 'Los datos ingresados para crear la empresa son inválidos.'})
  @ApiResponse({status: 500,description: 'Se ha producido un error interno del servidor al crear la empresa.'})
  create(@Body() createBusiness: CreateBusinessDto) {
    return this.businessService.create(createBusiness);
  }

  @Get()
  @ApiResponse({status: 200, description: 'Todas las empresas fueron encontradas correctamente.'})
  @ApiResponse({status: 404, description: 'No se encontraron empresas en el sistema.'})
  @ApiResponse({status: 500,description: 'Se ha producido un error interno del servidor al buscar las empresas.'})
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'Empresa encontrada correctamente.'})
  @ApiResponse({status: 404, description: 'No se encontró la empresa con el ID proporcionado.'})
  @ApiResponse({status: 500, description: 'Se ha producido un error interno del servidor al buscar la empresa.'})
  findOne(@Param('id') id: string) {
    return this.businessService.findOneById(id);
  }

  @Patch('/update/:id')
  @ApiResponse({status: 200, description: 'Empresa actualizada correctamente.'})
  @ApiResponse({status: 404, description: 'No se encontró la empresa con el ID proporcionado.'})
  @ApiResponse({status: 500,description: 'Se ha producido un error interno del servidor al actualizar la empresa.'})
  update(@Param('id') id:string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.updateBusiness(id, updateBusinessDto);
  }

  @Delete('/delete/:id')
  @ApiResponse({status: 200, description: 'Empresa eliminada correctamente.'})
  @ApiResponse({status: 404, description: 'No se encontró la empresa con el ID proporcionado.'})
  @ApiResponse({status: 500, description: 'Se ha producido un error interno del servidor al eliminar la empresa.'})
  remove(@Param('id') id: string) {
    return this.businessService.deleteBusiness(id);
  }
}