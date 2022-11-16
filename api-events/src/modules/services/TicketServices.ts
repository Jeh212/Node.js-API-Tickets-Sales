import { inject, injectable } from "tsyringe";
import { InjectionTokens } from "../../../container";
import { ITicket } from "../../entities/ITicket";
import {
  ITicketRepository,
  UpdateTicketBasicInfo,
} from "../../repositories/protocols/ITicketRepository";
import { ApiError, HttpCode } from "../../utils/ApiError";
import { ITicketServices } from "../protocols/ITicketService";

@injectable()
class TicketServices implements ITicketServices {
  constructor(
    @inject(InjectionTokens.TICKET_REPO)
    private readonly ticketRepo: ITicketRepository
  ) {}

  async newTicket(data: Omit<ITicket, "ticketId">): Promise<ITicket> {
    const eventTickets = await this.ticketRepo.listEventsTickets(
      data.relatedEventId
    );

    if (eventTickets.length === 0) {
      const createTicket = await this.ticketRepo.createTicket(data);

      return createTicket;
    }

    const lastBatchValueCreated = eventTickets.at(-1)?.ticketEventBatch!!;

    const newTicket = {
      ...data,
      ticketEventBatch: lastBatchValueCreated + 1,
    };

    const createNewBatchTicket = await this.ticketRepo.createTicket(newTicket);

    return createNewBatchTicket;
  }

  async retriveTicketById(ticketId: string): Promise<ITicket> {
    const ticket = await this.ticketRepo.getTicket(ticketId);

    if (!ticket) {
      throw new ApiError("Ticket Not Found", HttpCode.NOT_FOUND);
    }

    return ticket;
  }

  async allEventTickets(eventId: string): Promise<ITicket[] | []> {
    const tickets = await this.ticketRepo.listEventsTickets(eventId);

    if (tickets.length === 0) {
      return tickets;
    }

    return tickets;
  }
  async updateTicketPrices(
    ticketId: string,
    { ticketPrice, ticketRate }: UpdateTicketBasicInfo
  ): Promise<void> {
    const ticket = await this.ticketRepo.getTicket(ticketId);

    if (!ticket) {
      throw new ApiError("Ticket Not Found", HttpCode.NOT_FOUND);
    }

    await this.ticketRepo.updateTicketPrices(ticket.ticketId, {
      ticketPrice,
      ticketRate,
    });

    return;
  }
  async deleteTicketById(ticketId: string): Promise<void> {
    const ticket = await this.ticketRepo.getTicket(ticketId);

    if (!ticket) {
      throw new ApiError("Ticket Not Found", HttpCode.NOT_FOUND);
    }

    await this.ticketRepo.deleteTickets(ticket.ticketId);

    return;
  }
}
export { TicketServices };
