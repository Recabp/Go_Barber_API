import { Request, Response } from 'express'

import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.run({
      name,
      email,
      password,
    });



    return response.json(classToClass(user));

  }
}
