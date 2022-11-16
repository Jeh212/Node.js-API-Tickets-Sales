import { Request, Response } from "express";
import { container } from "tsyringe";
import { EventService } from "../../modules/services/EventService";
import { ApiResponse, IEventController } from "./protocols/IEventController";

class EventController implements IEventController {
  async newEventController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const {
        eventTitle,
        eventDescription,
        eventDate,
        eventContact,
        eventInstagram,
        eventFacebook,
        activeEvent,
        eventStreet,
        eventAddressNumber,
        eventCity,
        eventState,
        organizerId,
      } = request.body;

      const eventService = container.resolve(EventService);

      await eventService.newEvent({
        eventTitle,
        eventDescription,
        eventDate: new Date(eventDate),
        eventContact,
        eventInstagram,
        eventFacebook,
        activeEvent,
        eventStreet,
        eventAddressNumber,
        eventCity,
        eventState,
        organizerId,
      });

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async findEventByIdController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { eventId } = request.params;

      const eventService = container.resolve(EventService);

      const event = await eventService.findEventById(eventId);

      return response.json({
        msg: "ok",
        data: event,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async findEventByTitleController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const eventTitle = request.query.eventTitle;

      const eventService = container.resolve(EventService);

      const event = await eventService.findEventByTitle(String(eventTitle));

      return response.json({
        msg: "ok",
        data: event,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async updateEventInfoController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const {
        eventTitle,
        eventDescription,
        eventDate,
        eventContact,
        eventInstagram,
        eventFacebook,
        activeEvent,
        eventStreet,
        eventAddressNumber,
        eventCity,
        eventState,
        organizerId,
        eventId,
      } = request.body;

      const eventService = container.resolve(EventService);

      await eventService.updateEventInfo(eventId, {
        eventTitle,
        eventDescription,
        eventDate,
        eventContact,
        eventInstagram,
        eventFacebook,
        activeEvent,
        eventStreet,
        eventAddressNumber,
        eventCity,
        eventState,
        organizerId,
      });

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async removeEvent(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { eventId } = request.params;

      const eventService = container.resolve(EventService);

      await eventService.removeEvent(eventId);

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
}
export { EventController };
