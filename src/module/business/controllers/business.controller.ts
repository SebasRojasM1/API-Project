import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
import { CreateBusinessDto } from '../dto/create-business.dto';
import { UpdateBusinessDto } from '../dto/update-business.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Business') 
@ApiBearerAuth() 
@Controller('user')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post("create")
  create(@Body() createBusiness: CreateBusinessDto) {
    return this.businessService.create(createBusiness);
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.updateBusiness(id, updateBusinessDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.businessService.deleteBusiness(id);
  }
}