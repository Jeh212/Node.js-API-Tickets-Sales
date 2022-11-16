import { inject, injectable } from "tsyringe";
import { InjectionTokens } from "../../../container";
import { IEvent } from "../../entities/IEvent";
import { IEventRepository } from "../../repositories/protocols/IEventRepository";
import { ApiError, HttpCode } from "../../utils/ApiError";
import { IEventService } from "../protocols/IEventService";

@injectable()
class EventService implements IEventService {
  constructor(
    @inject(InjectionTokens.EVENT_REPO)
    private readonly eventRepo: IEventRepository
  ) {}

  async newEvent(event: Omit<IEvent, "eventId">): Promise<void> {
    const eventExist = await this.eventRepo.getEventByTitle(event.eventTitle);

    if (eventExist) {
      throw new ApiError("Event already exist", HttpCode.CONFLICT);
    }

    await this.eventRepo.createEvent(event);

    return;
  }
  async findEventById(eventId: string): Promise<IEvent> {
    const event = await this.eventRepo.getEventById(eventId);

    if (!event) {
      throw new ApiError("Event not exist", HttpCode.NOT_FOUND);
    }

    return event;
  }
  async findEventByTitle(eventTitle: string): Promise<IEvent> {
    const event = await this.eventRepo.getEventByTitle(eventTitle);

    if (!event) {
      throw new ApiError("Event not exist", HttpCode.NOT_FOUND);
    }

    return event;
  }
  async updateEventInfo(
    eventId: string,
    event: Omit<IEvent, "eventId">
  ): Promise<void> {
    const eventExist = await this.eventRepo.getEventByTitle(event.eventTitle);

    if (!eventExist) {
      throw new ApiError("Event not exist", HttpCode.NOT_FOUND);
    }

    await this.eventRepo.updateEvent(eventId, event);

    return;
  }
  async removeEvent(eventId: string): Promise<void> {
    const eventExist = await this.eventRepo.getEventById(eventId);

    if (!eventExist) {
      throw new ApiError("Event not exist", HttpCode.NOT_FOUND);
    }

    await this.eventRepo.deleteEvent(eventId);

    return;
  }
}
export { EventService };
