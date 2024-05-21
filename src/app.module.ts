import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PersistenceModule } from './libs/persistence';
import dbConfig from './libs/persistence/db-config';
import { UsersModule } from './module/users/users.module';
import { BusinessModule } from './module/business/business.module';
import { AuthModule } from './libs/auth/auth.module';
import { LoggingInterceptor } from './libs/common/interceptor/logging.interceptor';
import { AllExceptionsFilter } from './libs/common/filters/exceptions.filters';


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
      useClass: LoggingInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
})
export class AppModule {}
