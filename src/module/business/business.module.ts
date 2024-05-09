import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessEntity, businessSchema } from '../business/entities/business.entity';
import { BusinessService } from '../business/services/business.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessEntity.name, schema: businessSchema },
    ]),
  ],
  providers: [BusinessService],
  exports: [BusinessService, MongooseModule]
})
export class BusinessModule{}