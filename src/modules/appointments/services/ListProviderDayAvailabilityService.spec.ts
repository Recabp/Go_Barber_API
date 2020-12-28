import 'reflect-metadata';

import FakeAppointmentsRepository from '../ repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaliabilityService from './ListProviderDayAvailabilityService';



let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvaliability: ListProviderDayAvaliabilityService;

describe('ShowProfile', () => {
  beforeEach(() => {

    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvaliability = new ListProviderDayAvaliabilityService(fakeAppointmentsRepository);


  });


  it('should be able to list the day avaliability from providers', async () => {
    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 11, 20, 13, 0, 0)
    });


    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123123',
      date: new Date(2020, 11, 20, 16, 0, 0)
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 20, 11).getTime()
    });



    const avaliability = await listProviderDayAvaliability.run({
      professional_id: 'user',
      year: 2020,
      month: 12,
      day: 20,
    });


    expect(avaliability).toEqual(expect.arrayContaining([
      { hour: 8, avaliable: false },
      { hour: 10, avaliable: false },
      { hour: 11, avaliable: false },
      { hour: 12, avaliable: true },
      { hour: 13, avaliable: false },
      { hour: 16, avaliable: false },

    ]));



  });

});
