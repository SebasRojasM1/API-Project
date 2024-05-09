import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './libs/persistence';
import dbConfig from './libs/persistence/db.config';
import { AuthModule } from './libs/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,

    }),
    PersistenceModule,
    AuthModule
  ],
})
export class AppModule {}
