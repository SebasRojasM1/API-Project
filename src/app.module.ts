import { Module } from '@nestjs/common';
import { AppointmentsModule } from './module/appointments/appointments.module';

@Module({
  imports: [AppointmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
