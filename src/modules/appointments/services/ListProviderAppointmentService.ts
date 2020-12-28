
import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../ repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/conteiner/providers/CacheProvider/models/ICacheProvider';




interface IRequest {
  professional_id: string;
  month: number;
  year: number;
  day: number;
}


@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ) { }

  public async run({ professional_id, month, year, day }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${professional_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

    if (!appointments) {

      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        professional_id,
        month,
        year,
        day,
      });
    };

    await this.cacheProvider.save(cacheKey
      , appointments);

    return appointments;

  }
}

export default ListProviderAppointmentService;
