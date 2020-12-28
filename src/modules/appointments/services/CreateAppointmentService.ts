import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IApointmentsRepository from '../ repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/conteiner/providers/CacheProvider/models/ICacheProvider';


interface IRequestDTO {
  date: Date;
  user_id: string;
  professional_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IApointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async run({ date, professional_id, user_id }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);


    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date.');
    }

    if (user_id === professional_id) {
      throw new AppError('You can not create a appointment whith yourself')
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointments between 8am and 5pm')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This houer is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      professional_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: professional_id,
      content: `New appointment for day ${dateFormatted}`,
    })

    await this.cacheProvider.invalidate(`provider-appointments:${professional_id}:${format(appointmentDate, 'yyyy-M-d')}`)



    return appointment;
  }
}
export default CreateAppointmentService;
