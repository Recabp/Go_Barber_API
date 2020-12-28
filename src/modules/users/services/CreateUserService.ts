import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/conteiner/providers/CacheProvider/models/ICacheProvider';



interface IRequest {
  name: string,
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ) { }

  public async run({ name, email, password }: IRequest): Promise<User> {


    const checkUserExists = await this.usersRepository.findByEmail(email)
    if (checkUserExists) {
      throw new AppError('This email is already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidate('provider-list:*')

    return user;
  }
}

export default CreateUserService;
