import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import multer from 'multer';
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import uploadConfig from '@config/uploadconfig';
import UsersControllers from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const upload = multer(uploadConfig);
const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();


usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), usersControllers.create);


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
