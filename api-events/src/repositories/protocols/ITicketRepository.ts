import { ITicket } from "../../entities/ITicket";

export type UpdateTicketBasicInfo = Pick<ITicket, "ticketPrice" | "ticketRate">;

export interface ITicketRepository {
  createTicket(ticket: Omit<ITicket, "ticketId">): Promise<ITicket>;
  getTicket(ticketId: string): Promise<ITicket | undefined>;
  listEventsTickets(eventId: string): Promise<ITicket[]>;
  updateTicketPrices(
    ticketId: string,
    ticket: UpdateTicketBasicInfo
  ): Promise<void>;
  deleteTickets(ticketId: string): Promise<void>;
}
