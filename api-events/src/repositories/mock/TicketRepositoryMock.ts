import { ITicket } from "../../entities/ITicket";
import { ITicketRepository } from "../protocols/ITicketRepository";

import { v4 as uuid } from "uuid";

export class TicketRepositoryMock implements ITicketRepository {
  private readonly ticketRepository: Array<ITicket | any> = [];

  async createTicket(ticket: Omit<ITicket, "ticketId">): Promise<ITicket> {
    const newTicket = {
      ticketId: uuid(),
      ...ticket,
    };

    this.ticketRepository.push(newTicket);

    return newTicket;
  }
  async getTicket(ticketId: string): Promise<ITicket | undefined> {
    return this.ticketRepository.find((ticket) => ticket.ticketId === ticketId);
  }

  async listEventsTickets(eventId: string): Promise<ITicket[]> {
    const findEventsTickets = this.ticketRepository.filter(
      ({ relatedEventId }) => {
        return relatedEventId === eventId;
      }
    );
    return findEventsTickets;
  }

  async updateTicketPrices(
    ticketId: string,
    ticket: { ticketPrice: number; ticketRate: number }
  ): Promise<void> {
    const updatedPrices = {
      ticketId,
      ticketPrice: ticket.ticketPrice,
      ticketRate: ticket.ticketRate,
    };

    this.ticketRepository.pop();

    this.ticketRepository.push(updatedPrices);
  }
  async deleteTickets(ticketId: string): Promise<void> {
    this.ticketRepository.pop();

    return;
  }
}
