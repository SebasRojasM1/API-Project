import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AppointmentsModule } from './module/appointments/appointments.module';

@Module({
  imports: [AppointmentsModule],
  controllers: [],
  providers: [],
=======
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
>>>>>>> thomas2
})
export class AppModule {}
