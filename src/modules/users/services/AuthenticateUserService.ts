import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import authconfig from '@config/authconfig';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}
interface Response {
  user: User
  token: string
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async run({ email, password }: IRequest): Promise<Response> {


    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const { secret, expiresIn } = authconfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
