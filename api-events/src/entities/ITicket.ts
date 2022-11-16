interface ITicket {
  ticketId: string;
  ticketPrice: number;
  ticketRate: number;
  ticketEventBatch: number;
  ticketAmountAvailable: number;
  relatedEventId: string;
  ticketExpireDate: Date;
}

export { ITicket };
