import { ITicket } from "../../../entities/ITicket";
import { ormClient } from "../../../infra/database/ormClient";
import { ApiError, HttpCode } from "../../../utils/ApiError";
import { handleRepo } from "../../../utils/handleRepo";
import {
  ITicketRepository,
  UpdateTicketBasicInfo,
} from "../../protocols/ITicketRepository";

export class TicketRepository implements ITicketRepository {
  private readonly ormRepository = ormClient;

  async createTicket({
    ticketPrice,
    ticketRate,
    relatedEventId,
    ticketAmountAvailable,
    ticketEventBatch,
    ticketExpireDate,
  }: Omit<ITicket, "ticketId">): Promise<ITicket> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.ticket.create({
        data: {
          ticketPrice,
          ticketRate,
          relatedEventId,
          ticketAmountAvailable,
          ticketEventBatch,
          ticketExpireDate,
        },
      })
    );
    console.log(error);

    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }

  async getTicket(ticketId: string): Promise<ITicket | undefined> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.ticket.findFirst({
        where: {
          ticketId,
        },
        include: {
          ticketEventRelatedId: true,
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

  async listEventsTickets(eventId: string): Promise<ITicket[]> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.ticket.findMany({
        where: {
          relatedEventId: eventId,
        },
        include: {
          ticketEventRelatedId: true,
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

  async updateTicketPrices(
    ticketId: string,
    { ticketPrice, ticketRate }: UpdateTicketBasicInfo
  ): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.ticket.update({
        data: {
          ticketPrice,
          ticketRate,
        },
        where: {
          ticketId,
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

  async deleteTickets(ticketId: string): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.ticket.delete({
        where: {
          ticketId,
        },
      })
    );
    console.log(error);

    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }
}
