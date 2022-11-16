import { IOrganizer } from "../../entities/IEvent";

export interface IOrganizerService {
  newOrganizer(data: Omit<IOrganizer, "id">): Promise<IOrganizer>;
  retriveOrganizer(cnpj: string): Promise<IOrganizer>;
  updateOrganizer(cnpj: string, data: Omit<IOrganizer, "id">): Promise<void>;
}
