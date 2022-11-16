import { Request, Response } from "express";
import { ITicket } from "../../../entities/ITicket";
import { UpdateTicketBasicInfo } from "../../../repositories/protocols/ITicketRepository";

export interface ApiResponse {
  msg: string;
  data: ITicket[] | ITicket | void;
}

interface ITicketController {
  createTicketController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
  retriveTicketController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
  everyEventTicketsController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
  updateEventTicketPrice(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
  hardDeleteTicket(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
}
export { ITicketController };
