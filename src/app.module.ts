import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './libs/persistence';
import dbConfig from './libs/persistence/db.config';
import { AuthModule } from './libs/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { BusinessModule } from './module/business/business.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    AuthModule,
    UsersModule,
    BusinessModule,
  ],
})
export class AppModule {}
