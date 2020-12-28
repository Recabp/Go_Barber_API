import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/ repositories/IAppointmentsRepository';
import ICreateAppointementDTO from '@modules/appointments/dtos/ICreateAppointmenteDTO';
import IFindAllInMouthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMouthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO ';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },

    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({ professional_id, month, year }: IFindAllInMouthFromProviderDTO): Promise<Appointment[]> {
    const parsedMounth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        professional_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMounth}-${year}'`)
      },
    })


    return appointments;
  }

  public async findAllInDayFromProvider({ professional_id, month, year, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMounth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        professional_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMounth}-${year}'`)
      },
    })


    return appointments;
  }

  public async create({ date, professional_id, user_id }: ICreateAppointementDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ professional_id, date, user_id });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
