import 'reflect-metadata';

import FakeAppointmentsRepository from '../ repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvailabilityService';



let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvaliability: ListProviderMonthAvaliabilityService;

describe('ShowProfile', () => {
  beforeEach(() => {

    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvaliability = new ListProviderMonthAvaliabilityService(fakeAppointmentsRepository);


  });


  it('should be able to list the mouth avaliability from providers', async () => {
    await fakeAppointmentsRepository.create({
      user_id: '123123',
      professional_id: 'user',
      date: new Date(2020, 11, 20, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 9, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 10, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 11, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 12, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 13, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 14, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 15, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 16, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 20, 17, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      professional_id: 'user',
      user_id: '123123',
      date: new Date(2020, 11, 21, 8, 0, 0)
    });

    const avaliability = await listProviderMonthAvaliability.run({
      professional_id: 'user',
      year: 2020,
      month: 12,
    });


    expect(avaliability).toEqual(expect.arrayContaining([
      { day: 19, avaliable: true },
      { day: 20, avaliable: false },
      { day: 21, avaliable: true },
      { day: 22, avaliable: true },

    ]));



  });

});
