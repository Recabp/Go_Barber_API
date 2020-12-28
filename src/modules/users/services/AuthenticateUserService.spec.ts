import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeusersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/conteiner/providers/CacheProvider/fakes/FakecacheProvider'

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;



describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);



  });


  it('should be able to authenticate', async () => {

    const user = await createUser.run({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',
    });

    const response = await authenticateUser.run({
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);


  });

  it('should not be able to authenticate whith no match passord', async () => {



    expect(authenticateUser.run({
      email: 'fulanodetal@exemple.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate', async () => {

    await createUser.run({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',
    });


    expect(authenticateUser.run({
      email: 'fulanodetal@exemple.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError);



  });



});

