import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PersistenceModule } from './libs/persistence';
import dbConfig from './libs/persistence/db-config';
import { UsersModule } from './module/users/users.module';
import { BusinessModule } from './module/business/business.module';
import { AuthModule } from './libs/auth/auth.module';
import { LoggingInterceptor } from './libs/common/interceptor/logging.interceptor';
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
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
