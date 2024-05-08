import { Module } from '@nestjs/common';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
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
  controllers: [],
  providers: [],
})
export class AppModule {}
