import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmenteDTO from '../dtos/ICreateAppointmenteDTO';
import IFindAllInMouthFromProviderDTO from '../dtos/IFindAllInMouthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO ';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmenteDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMouthFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
};
