import { Request, Response } from "express";
import { container } from "tsyringe";

import ProviderMonthAvailibilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";

export default class ProviderMonthAvailibilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;
    const providerMonthAvailibility = container.resolve(
      ProviderMonthAvailibilityService
    );

    const availability = await providerMonthAvailibility.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
