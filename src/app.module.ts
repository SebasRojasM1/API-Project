import { Module } from '@nestjs/common';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db.config';
import { BusinessModule } from './module/business/business.module';
import { UsersModule } from './module/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    UsersModule,
    BusinessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
