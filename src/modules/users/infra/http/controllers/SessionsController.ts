//index, show, create, update, delete

import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';


import AuthenticatedUserService from '@modules/users/services/AuthenticateUserService';


export default class SessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;


    const authenticateUser = container.resolve(AuthenticatedUserService);

    const { user, token } = await authenticateUser.run({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
