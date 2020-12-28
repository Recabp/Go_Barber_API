import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/ repositories/IAppointmentsRepository';

import ICreateAppointementDTO from '@modules/appointments/dtos/ICreateAppointmenteDTO';
import IFindAllInMouthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMouthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO ';


class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date),
    );

    return findAppointment;


  }

  public async findAllInMonthFromProvider({ professional_id, month, year }: IFindAllInMouthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.professional_id === professional_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;


  }

  public async findAllInDayFromProvider({ professional_id, month, year, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.professional_id === professional_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;


  }

  public async create({ date, professional_id, user_id }: ICreateAppointementDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, professional_id, user_id })

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
