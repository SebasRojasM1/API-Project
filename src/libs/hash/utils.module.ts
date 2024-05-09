import { Module } from '@nestjs/common';
import { HashService } from './service/hash.service';

@Module({
  providers: [HashService]
})
export class UtilsModule {}
