/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto';
import { Model } from 'mongoose';
import { Appointment } from '../entities/appointment.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<Appointment>) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const existingAppointment = await this.appointmentModel
      .findOne({ id: createAppointmentDto.id })
      .exec();
    //Verifica desde una peticion HTTP la propiedad "Email" si ya existe el email ingresado en la DB...

    //Sí ya existe el email en la DB... ¡ERROR!
    if (existingAppointment) {
      throw new HttpException(
        `The appointment with ID ${createAppointmentDto.id} already exists`,
        HttpStatus.BAD_REQUEST, //Es un código de estado HTTP usado para indicar que la solicitud del cliente no pudo ser procesada debido a un error en la solicitud del cliente.
      );
    }

    const createdAppointment = new this.appointmentModel(createAppointmentDto);
    return createdAppointment.save();
  }


  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }


  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findById(id).exec();
    if (!appointment) {
      throw new NotFoundException(`The appointment with id ${id} not found`);
    }
    return appointment;
  }


  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const updateAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .exec();
    if (!updateAppointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }
    return updateAppointment;
  }

  async remove(id: string): Promise<void> {
    const appointment = await this.appointmentModel.findOneAndDelete().exec();
    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }
  }
}
