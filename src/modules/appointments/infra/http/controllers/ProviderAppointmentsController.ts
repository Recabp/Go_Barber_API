import { Request, Response } from 'express';
import { container } from 'tsyringe'

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';
import { classToClass } from 'class-transformer';




export default class ProviderAppointementsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const professional_id = request.user.id;
    const { day, month, year } = request.body;




    const listProviderAppointments = container.resolve(ListProviderAppointmentService);

    const appointments = await listProviderAppointments.run({
      professional_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
};
