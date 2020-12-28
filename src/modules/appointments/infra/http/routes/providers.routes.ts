import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';



import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ensureAuthenticated from '@shared/infra/http/midlewares/ensureAuthenticated';

const providersRouter = Router();
const appointmentsController = new ProvidersController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()


providersRouter.use(ensureAuthenticated);

providersRouter.get('/', appointmentsController.index);

providersRouter.get('/:id/month-availability', celebrate({
  [Segments.PARAMS]: {
    professional_id: Joi.string().uuid().required(),
  }
}), providerMonthAvailabilityController.index);

providersRouter.get('/:id/day-availability', celebrate({
  [Segments.PARAMS]: {
    professional_id: Joi.string().uuid().required(),
  }
}), providerDayAvailabilityController.index);

export default providersRouter;
