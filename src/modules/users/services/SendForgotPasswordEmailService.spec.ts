import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeusersRepository';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/conteiner/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );


  });

  it('should be able to recover the password using the email', async () => {

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    await sendForgotPasswordEmail.run({

      email: 'fulanodetal@exemple.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);


  });

  it('should not be able to recover a non-existing user password', async () => {

    await expect(
      sendForgotPasswordEmail.run({
        email: 'fulanodetal@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should generate a forgot password token', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fulano de Tal',
      email: 'fulanodetal@exemple.com',
      password: '123456',

    });

    await sendForgotPasswordEmail.run({

      email: 'fulanodetal@exemple.com',
    });

    expect(sendMail).toHaveBeenCalled();


  });

});
