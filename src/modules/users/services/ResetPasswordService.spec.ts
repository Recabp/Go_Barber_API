import 'reflect-metadata';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeusersRepository';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;


describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,

    );


  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });
    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.run({
      password: '123321',
      token,

    });

    const updateUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('123321');
    expect(updateUser?.password).toBe('123321');


  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.run({
        token: 'non-existing-token',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user');

    await expect(
      resetPassword.run({
        token,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano de tal',
      email: 'fulanodetal@example.com',
      password: '123456',
    });
    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    })

    await expect(
      resetPassword.run({
        password: '123321',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  })

});
