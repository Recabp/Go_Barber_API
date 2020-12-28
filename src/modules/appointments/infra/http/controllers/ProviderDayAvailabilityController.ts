import { Request, Response } from 'express';
import { container } from 'tsyringe'

import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';


export default class ProviderDayAvaliabilityControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const professional_id = request.params.id;
    const { day, month, year } = request.body;


    const ListProviderDayAvaliability = container.resolve(ListProviderDayAvaliabilityService);

    const availability = await ListProviderDayAvaliability.run({
      professional_id,
      day,
      month,
      year,

    });

    return response.json(availability);
  }
};
