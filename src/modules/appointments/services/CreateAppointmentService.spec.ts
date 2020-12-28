import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../ repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeCacheProvider from '@shared/conteiner/providers/CacheProvider/fakes/FakecacheProvider'

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;



describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);

  })




  describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2020, 11, 30, 16).getTime();
      })

      const appointment = await createAppointment.run({
        date: new Date(2020, 11, 30, 16),
        user_id: 'user_id',
        professional_id: 'professional_id',
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.professional_id).toBe('professional_id');

    });
  });

  it('should not be able to create two appointments on the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 30, 16).getTime();
    })

    await createAppointment.run({
      date: new Date(2020, 11, 30, 16),
      user_id: 'user_id',
      professional_id: 'professional_id',

    });

    await expect(createAppointment.run({
      date: new Date(2020, 11, 30, 16),
      user_id: '123345',
      professional_id: '123123123123',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to create appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 1, 10).getTime();
    })

    await expect(
      createAppointment.run({
        date: new Date(2020, 4, 1, 10),
        user_id: 'user_id',
        professional_id: 'professional_id',

      }),
    ).rejects.toBeInstanceOf(AppError);


  });

  it('should not be able to create appointment whith same user and provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 1, 10).getTime();
    })

    await expect(
      createAppointment.run({
        date: new Date(2020, 11, 1, 13),
        user_id: 'user_id',
        professional_id: 'user_id',

      }),
    ).rejects.toBeInstanceOf(AppError);


  });

  it('should not be able to create appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 1, 10).getTime();
    })

    await expect(
      createAppointment.run({
        date: new Date(2020, 11, 2, 7),
        user_id: 'user_id',
        professional_id: 'professional_id',

      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.run({
        date: new Date(2020, 11, 2, 18),
        user_id: 'user_id',
        professional_id: 'professional_id',

      }),
    ).rejects.toBeInstanceOf(AppError);


  });

});




