import 'reflect-metadata';

import FakeAppointmentsRepository from '../ repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentService from './ListProviderAppointmentService';
import FakeCacheProvider from '@shared/conteiner/providers/CacheProvider/fakes/FakecacheProvider'


let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointment: ListProviderAppointmentService;

describe('ListProviderAppointment', () => {
  beforeEach(() => {

    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointment = new ListProviderAppointmentService(fakeAppointmentsRepository, fakeCacheProvider);


  });


  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      professional_id: 'professional',
      user_id: '123123123',
      date: new Date(2020, 11, 20, 13, 0, 0)

    });


    const appointment2 = await fakeAppointmentsRepository.create({
      professional_id: 'professional',
      user_id: '123123123',
      date: new Date(2020, 11, 20, 14, 0, 0)

    });

    const appointments = await listProviderAppointment.run({
      professional_id: 'professional',
      year: 2020,
      month: 12,
      day: 20,
    })

    expect(appointments).toEqual([appointment1, appointment2]);

  });

});
