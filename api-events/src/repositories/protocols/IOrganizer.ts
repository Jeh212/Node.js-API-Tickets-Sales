import { IOrganizer } from "../../entities/IEvent";

interface IOrganizerRepository {
  createOrganizer(data: Omit<IOrganizer, "id">): Promise<IOrganizer>;
  getOrganizer(cnpj: string): Promise<IOrganizer>;
  getOrganizerById(id: string): Promise<IOrganizer>;
  updateOrganizer(id: string, data: Omit<IOrganizer, "id">): Promise<void>;
}

export { IOrganizerRepository };
