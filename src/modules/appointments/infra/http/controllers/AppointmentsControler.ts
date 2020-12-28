import { Request, Response } from 'express';
//import { parseISO } from 'date-fns';
import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';



export default class AppointementsController {
  public async create(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;
    const { professional_id, date } = request.body;


    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.run({ date, professional_id, user_id });

    return response.json(appointment);

  }
};
