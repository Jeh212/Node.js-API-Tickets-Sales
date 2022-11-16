import { Request, Response } from "express";
import { IEvent } from "../../../entities/IEvent";

export interface ApiResponse {
  msg: string;
  data: IEvent[] | IEvent | void;
}

interface IEventController {
  newEventController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
  findEventByIdController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
  findEventByTitleController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
  updateEventInfoController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
  removeEvent(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
}
export { IEventController };
