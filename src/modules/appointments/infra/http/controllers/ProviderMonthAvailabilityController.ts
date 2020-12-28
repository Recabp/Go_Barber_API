import { Request, Response } from 'express';
import { container } from 'tsyringe'

import ListProviderMonthAvaliabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';


export default class ProviderMonthAvaliabilityControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const professional_id = request.params.id;
    const { month, year } = request.body;


    const ListProviderMonthAvaliability = container.resolve(ListProviderMonthAvaliabilityService);

    const availability = await ListProviderMonthAvaliability.run({
      professional_id,
      month,
      year,
    });

    return response.json(availability);
  }
};
