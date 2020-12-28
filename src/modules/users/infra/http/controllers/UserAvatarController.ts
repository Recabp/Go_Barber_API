import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'


import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';



import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.run({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));

  }
};
