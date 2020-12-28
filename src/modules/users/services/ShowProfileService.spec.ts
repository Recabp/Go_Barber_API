import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeusersRepository';
import ShowProfileService from './ShowProfileService';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);


  });


  it('should be able to show the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    const profile = await showProfile.run({
      user_id: user.id,

    });

    expect(profile.name).toBe('Fulano de Tal');
    expect(profile.email).toBe('fulanodetal@exemple.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {


    expect(showProfile.run({
      user_id: 'non-existing-user_id',

    })).rejects.toBeInstanceOf(AppError);

  });





});
