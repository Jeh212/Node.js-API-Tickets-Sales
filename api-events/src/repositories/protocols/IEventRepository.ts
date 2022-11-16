import { IEvent, IOrganizer } from "../../entities/IEvent";

interface IEventRepository {
  createEvent(event: Omit<IEvent, "eventId">): Promise<IEvent>;
  getEventById(eventId: string): Promise<IEvent>;
  getEventByTitle(eventTitle: string): Promise<IEvent>;
  updateEvent(eventId: string, event: Omit<IEvent, "eventId">): Promise<IEvent>;
  deleteEvent(eventId: string): Promise<IEvent>;
}
export { IEventRepository };
