import { Module } from '@nestjs/common';
import { BusinessService } from './services/business.service';
import { BusinessController } from './controllers/business.controller';

@Module({
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
