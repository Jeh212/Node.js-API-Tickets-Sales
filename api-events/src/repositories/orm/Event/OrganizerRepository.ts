import { IOrganizer } from "../../../entities/IEvent";
import { ormClient } from "../../../infra/database/ormClient";
import { ApiError, HttpCode } from "../../../utils/ApiError";
import { handleRepo } from "../../../utils/handleRepo";
import { IOrganizerRepository } from "../../protocols/IOrganizer";

class OrganizerRepository implements IOrganizerRepository {
  private readonly ormRepository = ormClient;

  async createOrganizer(data: Omit<IOrganizer, "id">): Promise<IOrganizer> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.organizer.create({
        data,
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

  async getOrganizerById(id: string): Promise<IOrganizer> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.organizer.findFirst({
        where: { id },
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

  async getOrganizer(cnpj: string): Promise<IOrganizer> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.organizer.findFirst({
        where: {
          cnpj,
        },
        include: {
          events: true,
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

  async updateOrganizer(
    id: string,
    data: Omit<IOrganizer, "id">
  ): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.organizer.update({
        data,
        where: {
          id,
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
}
export { OrganizerRepository };
