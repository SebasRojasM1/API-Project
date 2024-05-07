import { Module } from '@nestjs/common';
import { AppointmentsService } from './services/appointments.service';
import { AppointmentsController } from './controllers/appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, appointmentSchema } from './entities/appointment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: appointmentSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}