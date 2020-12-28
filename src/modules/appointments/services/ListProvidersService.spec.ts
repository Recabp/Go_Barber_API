import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeusersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/conteiner/providers/CacheProvider/fakes/FakecacheProvider'


let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);


  });


  it('should be able to list the providers', async () => {

    const user1 = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    const user2 = await fakeUsersRepository.create({
      name: 'Fulano de Tal2',
      email: 'fulanodetal2@exemple.com',
      password: '123456',

    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Fulano de Tal3',
      email: 'fulanodetal3@exemple.com',
      password: '123456',

    });

    const providers = await listProviders.run({
      user_id: loggedUser.id,

    });

    expect(providers).toEqual([user1, user2]);

  });




});
