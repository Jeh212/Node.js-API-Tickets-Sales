import { Request, Response } from "express";
import { container } from "tsyringe";
import { TicketServices } from "../../modules/services/TicketServices";
import { HttpCode } from "../../utils/ApiError";
import { ApiResponse, ITicketController } from "./protocols/ITicketController";

export class TicketController implements ITicketController {
  async createTicketController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const {
        ticketPrice,
        ticketRate,
        ticketAmountAvailable,
        ticketEventBatch,
        relatedEventId,
        ticketExpireDate,
      } = request.body;

      const clientService = container.resolve(TicketServices);

      const ticket = await clientService.newTicket({
        ticketPrice,
        ticketRate,
        ticketAmountAvailable,
        ticketEventBatch,
        relatedEventId,
        ticketExpireDate,
      });

      return response.json(ticket);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async retriveTicketController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    const { ticketId } = request.params;

    try {
      const clientService = container.resolve(TicketServices);

      const ticket = await clientService.retriveTicketById(ticketId);

      return response.json({
        msg: "ok",
        data: ticket,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async everyEventTicketsController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    const { eventId } = request.params;

    try {
      const clientService = container.resolve(TicketServices);

      const ticket = await clientService.allEventTickets(eventId);

      return response.json({
        msg: "ok",
        data: ticket,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async updateEventTicketPrice(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    const { ticketId, ticketPrice, ticketRate } = request.body;

    try {
      const clientService = container.resolve(TicketServices);

      const values = {
        ticketPrice: Number(ticketPrice),
        ticketRate: Number(ticketRate),
      };

      await clientService.updateTicketPrices(ticketId, values);

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async hardDeleteTicket(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    const { ticketId } = request.params;

    try {
      const clientService = container.resolve(TicketServices);

      await clientService.deleteTicketById(ticketId);

      return response.json({
        msg: "ok",
        deletedItemId: ticketId,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
}
