import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';


import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';


const profileRouter = Router();




const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().uuid().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  },
}), profileController.show);

profileRouter.put('/', profileController.create);

export default profileRouter;
