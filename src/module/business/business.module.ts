import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessEntity, businessSchema } from '../business/entities/business.entity';
import { BusinessController } from '../business/controllers/business.controller';
import { BusinessService } from '../business/services/business.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessEntity.name, schema: businessSchema },
    ]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService]
})
export class BusinessModule {}