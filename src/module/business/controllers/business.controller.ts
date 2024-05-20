/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Patch, UseGuards } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/libs/auth/guards/auth.guard';
import { Role } from 'src/libs/common/enums/rol.enum';
import { Roles } from 'src/libs/decorators';

@ApiTags('Business') 
@ApiBearerAuth() 
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post("create")
  @ApiOperation({ summary: 'Create a business to the system.', description: 'Create a business to access the system.' })
  @ApiResponse({status: 201, description: 'Business created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the business is invalid.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while creating the business.'})
  create(@Body() createBusiness: CreateBusinessDto) {
    return this.businessService.create(createBusiness);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find all the business of the system.', description: 'View all business registered in the system.' })
  @ApiResponse({status: 200, description: 'All business were found successfully.'})
  @ApiResponse({status: 404, description: 'No business were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the business.'})
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Find the business by ID of the system.', description: 'View a specific business registered in the database.' })
  @ApiResponse({status: 200, description: 'Business found successfully.'})
  @ApiResponse({status: 404, description: 'Business with the provided ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the business.'})
  findOne(@Param('id') id: string) {
    return this.businessService.findOneById(id);
  }

  @Patch('update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a business to the system.', description: 'Update a specific business registered in the database.' })
  @ApiResponse({status: 200, description: 'Business successfully updated.'})
  @ApiResponse({status: 404, description: 'Business with the provided ID not found.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while updating the business.'})
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.updateBusiness(id, updateBusinessDto);
  }


  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a business to the system.', description: 'Delete a business of the system.' })
  @ApiResponse({status: 200, description: 'Business successfully deleted.'})
  @ApiResponse({status: 404, description: 'Business with the provided ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the business.'})
  remove(@Param('id') id: string) {
    return this.businessService.deleteBusiness(id);
  }
}