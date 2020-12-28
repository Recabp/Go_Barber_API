
import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns'


import IAppointmentsRepository from '../ repositories/IAppointmentsRepository';




interface IRequest {
  professional_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  avaliable: boolean;
}>;

@injectable()
class ListProviderMonthAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

  ) { }

  public async run({ professional_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      professional_id,
      year,
      month,
    });

    const numberOfDaysINMounth = getDaysInMonth(
      new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysINMounth },
      (_, index) => index + 1);

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });


      return {
        day,
        avaliable: appointmentsInDay.length < 10,
      }
    })


    return availability;


  }
}

export default ListProviderMonthAvaliabilityService;
