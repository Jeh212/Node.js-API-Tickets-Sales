import { inject, injectable } from "tsyringe";
import { InjectionTokens } from "../../../container";
import { IOrganizer } from "../../entities/IEvent";
import { IOrganizerRepository } from "../../repositories/protocols/IOrganizer";
import { ApiError, HttpCode } from "../../utils/ApiError";
import { IOrganizerService } from "../protocols/IOrganizerService";

@injectable()
class OrganizerService implements IOrganizerService {
  constructor(
    @inject(InjectionTokens.ORGAN_REPO)
    private readonly organizerRepo: IOrganizerRepository
  ) {}

  async newOrganizer(data: Omit<IOrganizer, "id">): Promise<IOrganizer> {
    const organizerAlreadyExist = await this.organizerRepo.getOrganizer(
      data.cnpj
    );

    if (organizerAlreadyExist) {
      throw new ApiError("Organizer ALready Exist!", HttpCode.CONFLICT);
    }

    const newOrganizer = await this.organizerRepo.createOrganizer(data);

    return newOrganizer;
  }

  async retriveOrganizer(cnpj: string): Promise<IOrganizer> {
    const organizer = await this.organizerRepo.getOrganizer(cnpj);

    if (!organizer) {
      throw new ApiError("Organizer not Exist!", HttpCode.NOT_FOUND);
    }

    return organizer;
  }

  async getOrgananizerById(id: string): Promise<IOrganizer> {
    const organizer = await this.organizerRepo.getOrganizerById(id);

    if (!organizer) {
      throw new ApiError("Organizer not Exist!", HttpCode.NOT_FOUND);
    }

    return organizer;
  }
  async updateOrganizer(
    cnpj: string,
    data: Omit<IOrganizer, "id">
  ): Promise<void> {
    const organizer = await this.organizerRepo.getOrganizer(cnpj);

    if (!organizer) {
      throw new ApiError("Organizer not Exist!", HttpCode.NOT_FOUND);
    }

    await this.organizerRepo.updateOrganizer(organizer.id, data);

    return;
  }
}
export { OrganizerService };
