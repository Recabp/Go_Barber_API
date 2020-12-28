import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/ repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensReposytory from '@modules/users/repositories/IUserTokensRepository';

import InotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsReposytory from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';



container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository);

container.registerSingleton<IUserTokensReposytory>(
  'UserTokensRepository', UserTokensRepository);

container.registerSingleton<InotificationsRepository>(
  'NotificationsRepository', NotificationsReposytory);
