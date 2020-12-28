import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeusersRepository';
import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);


  });




  it('should be able to update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    const updatedUser = await updateProfile.run({
      user_id: user.id,
      name: 'Fulaninho de tals',
      email: 'fulaninhodetals@example.com',
    });

    expect(updatedUser.name).toBe('Fulaninho de tals');
    expect(updatedUser.email).toBe('fulaninhodetals@example.com');
  });

  it('should not be able to update the profile from a non-existing-profile', async () => {


    expect(updateProfile.run({
      user_id: 'non-existing-user_id',
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',

    })).rejects.toBeInstanceOf(AppError);

  });



  it('should not be able to change to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    const user = await fakeUsersRepository.create({
      name: 'Fulaninho de Tals',
      email: 'fulanoinhodetals@exemple.com',
      password: '123456',

    });

    await expect(updateProfile.run({
      user_id: user.id,
      name: 'Fulaninho de Tals',
      email: 'fulanodetal@exemple.com',

    })).rejects.toBeInstanceOf(AppError)

  });


  it('should be able to update the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    const updatedUser = await updateProfile.run({
      user_id: user.id,
      name: 'Fulaninho de tals',
      email: 'fulaninhodetals@example.com',
      old_password: '123456',
      password: '123321'
    });


    expect(updatedUser.password).toBe('123321');
  });

  it('should not be able to update the password without the old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    await expect(updateProfile.run({
      user_id: user.id,
      name: 'Fulaninho de tals',
      email: 'fulaninhodetals@example.com',
      password: '123321'
    })).rejects.toBeInstanceOf(AppError);

  });



  it('should not be able to update the password without the correct old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    await expect(updateProfile.run({
      user_id: user.id,
      name: 'Fulaninho de tals',
      email: 'fulaninhodetals@example.com',
      old_password: 'wrong-old-password',
      password: '123321'
    })).rejects.toBeInstanceOf(AppError);


  });








});
