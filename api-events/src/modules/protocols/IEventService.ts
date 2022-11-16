import { IEvent } from "../../entities/IEvent";

interface IEventService {
  newEvent(event: Omit<IEvent, "eventId">): Promise<void>;
  findEventById(eventId: string): Promise<IEvent>;
  findEventByTitle(eventTitle: string): Promise<IEvent>;
  updateEventInfo(
    eventId: string,
    event: Omit<IEvent, "eventId">
  ): Promise<void>;
  removeEvent(eventId: string): Promise<void>;
}
export { IEventService };
