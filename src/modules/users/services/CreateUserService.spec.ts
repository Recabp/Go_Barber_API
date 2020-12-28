import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeusersRepository';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/conteiner/providers/CacheProvider/fakes/FakecacheProvider'

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);


  });


  it('should be able to create a new user', async () => {

    const user = await createUser.run({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    expect(user).toHaveProperty('id');
    ;

  });

  it('should not be able to create a new user with same email', async () => {


    await createUser.run({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    expect(createUser.run({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    }),
    ).rejects.toBeInstanceOf(AppError);


  });



});


