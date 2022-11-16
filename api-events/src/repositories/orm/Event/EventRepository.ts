import { IEvent } from "../../../entities/IEvent";
import { ormClient } from "../../../infra/database/ormClient";
import { ApiError, HttpCode } from "../../../utils/ApiError";
import { handleRepo } from "../../../utils/handleRepo";
import { IEventRepository } from "../../protocols/IEventRepository";

class EventRepository implements IEventRepository {
  private readonly ormRepository = ormClient;

  async createEvent({
    activeEvent,
    eventAddressNumber,
    eventCity,
    eventContact,
    eventDate,
    eventDescription,
    eventFacebook,
    eventInstagram,
    eventState,
    eventStreet,
    eventTitle,
    organizerId,
  }: Omit<IEvent, "eventId">): Promise<IEvent> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.event.create({
        data: {
          activeEvent,
          eventAddressNumber,
          eventCity,
          eventContact,
          eventDate,
          eventDescription,
          eventFacebook,
          eventInstagram,
          eventState,
          eventStreet,
          eventTitle,
          organizerId,
        },
      })
    );

    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }
  async getEventById(eventId: string): Promise<IEvent> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.event.findFirst({
        where: {
          eventId,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }
  async getEventByTitle(eventTitle: string): Promise<IEvent> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.event.findFirst({
        where: {
          eventTitle,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }
  async updateEvent(
    eventId: string,
    {
      activeEvent,
      eventAddressNumber,
      eventCity,
      eventContact,
      eventDate,
      eventDescription,
      eventFacebook,
      eventInstagram,
      eventState,
      eventStreet,
      eventTitle,
      organizerId,
    }: Omit<IEvent, "eventId">
  ): Promise<IEvent> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.event.update({
        data: {
          activeEvent,
          eventAddressNumber,
          eventCity,
          eventContact,
          eventDate,
          eventDescription,
          eventFacebook,
          eventInstagram,
          eventState,
          eventStreet,
          eventTitle,
          organizerId,
        },
        where: {
          eventId,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }
  async deleteEvent(eventId: string): Promise<IEvent> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.event.delete({
        where: {
          eventId,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }
}

export { EventRepository };
