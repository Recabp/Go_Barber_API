
import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns'


import IAppointmentsRepository from '../ repositories/IAppointmentsRepository';



interface IRequest {
  professional_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  avaliable: boolean;
}>;

@injectable()
class ListProviderDayAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

  ) { }

  public async run({ professional_id, month, year, day }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      professional_id,
      month,
      year,
      day,
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availavility = eachHourArray.map(hour => {
      const hasAppoitmentInHour = appointments.find(appointment =>
        getHours(appointment.date) === hour,
      );


      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        avaliable: !hasAppoitmentInHour && isAfter(compareDate, currentDate),
      }
    })


    return availavility;


  }
}

export default ListProviderDayAvaliabilityService;
