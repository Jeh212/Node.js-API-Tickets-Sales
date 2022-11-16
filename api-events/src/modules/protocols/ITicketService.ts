import { ITicket } from "../../entities/ITicket";
import { UpdateTicketBasicInfo } from "../../repositories/protocols/ITicketRepository";

interface ITicketServices {
  newTicket(data: Omit<ITicket, "ticketId">): Promise<ITicket>;
  retriveTicketById(ticketId: string): Promise<ITicket>;
  allEventTickets(eventId: string): Promise<ITicket[] | []>;
  updateTicketPrices(
    ticketId: string,
    { ticketPrice, ticketRate }: UpdateTicketBasicInfo
  ): Promise<void>;
  deleteTicketById(ticketId: string): Promise<void>;
}
export { ITicketServices };
