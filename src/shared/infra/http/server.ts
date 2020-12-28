import 'reflect-metadata';
import 'dotenv/config';
import express, {
  Request, Response, NextFunction,
} from 'express';
import { errors } from 'celebrate'
import 'express-async-errors';
import uploadconfig from '@config/uploadconfig';
import AppError from '@shared/errors/AppError';
import rateLimirer from './midlewares/RateLimiter';

import routes from './routes';
import '@shared/conteiner'
import { createConnections } from 'typeorm';

const app = express();



app.use(rateLimirer);
app.use(express.json());
app.use('/files', express.static(uploadconfig.tmpFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(6666, async () => {
  await createConnections();

  console.log('SERVER STARTED ON PORT 6666');

});
