import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './libs/persistence';
import { register } from 'module';
import dbConfig from './libs/persistence/db.config';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule
  ],
})
export class AppModule {}
