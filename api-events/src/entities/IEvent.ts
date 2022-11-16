import { ITicket } from "./ITicket";

interface IOrganizer {
  id: string;
  name: string;
  email: string;
  fantasyName: string;
  cnpj: string;
  events?: IEvent[];
}

interface IEvent {
  eventId?: string;
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  eventContact: string;
  eventInstagram: string;
  eventFacebook: string;
  activeEvent: boolean;

  eventStreet: string;
  eventAddressNumber: string;
  eventCity: string;
  eventState: string;
  organizerId: string;
}

export { IEvent, IOrganizer };
