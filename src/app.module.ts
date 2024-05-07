import { Module } from '@nestjs/common';
import { AppointmentsModule } from './module/appointments/appointments.module';
import { PersistenceModule } from './libs/persistence';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db.config';
import { BusinessModule } from './module/business/business.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    AppointmentsModule,
    BusinessModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
