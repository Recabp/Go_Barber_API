import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';



import AppointmentsController from '../controllers/AppointmentsControler';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';


const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();


appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', celebrate({
  [Segments.BODY]: {
    professional_id: Joi.string().uuid().required(),
    date: Joi.date(),
  }
}), appointmentsController.create);
appointmentsRouter.post('/me', providerAppointmentsController.index);

export default appointmentsRouter;
