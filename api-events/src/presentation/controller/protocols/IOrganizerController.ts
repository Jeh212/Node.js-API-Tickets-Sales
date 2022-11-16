import { Request, Response } from "express";
import { IOrganizer } from "../../../entities/IEvent";

export interface ApiResponse {
  msg: string;
  data: IOrganizer | void;
}

interface IOrganizerController {
  newOrganizerController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  findOrganizerByCNPJController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  updateOrganizerInfoController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
}
export { IOrganizerController };
