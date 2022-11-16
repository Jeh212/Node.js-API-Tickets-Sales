import { IClient } from "../../entities/IClient";
import { ormClient } from "../../infra/database/ormClient";
import { ApiError, HttpCode } from "../../utils/ApiError";
import { handleRepo } from "../../utils/handleRepo";
import {
  IClientRepository,
  NewAdmin,
  NewClientData,
} from "../protocol/IClientRepository";

class ClientRepository implements IClientRepository {
  private readonly orm = ormClient;

  async persistOrdinaryClient({
    email,
    name,
    password,
  }: NewClientData): Promise<IClient> {
    const [error, result] = await handleRepo(
      this.orm.client.create({
        data: {
          email,
          name,
          password,
        },
      })
    );

    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.orm.$disconnect;

    return result;
  }
  async persisteNewAdmin({
    email,
    name,
    password,
  }: NewAdmin): Promise<IClient> {
    console.log({ email, name, password });

    const [error, result] = await handleRepo(
      this.orm.client.create({
        data: {
          name,
          email,
          password,
          role: "ADMIN",
        },
      })
    );

    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.orm.$disconnect;

    return result;
  }
  async getClientById(id: string): Promise<IClient> {
    const [error, result] = await handleRepo(
      this.orm.client.findFirst({
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

    this.orm.$disconnect;

    return result;
  }
  async getClientByEmail(email: string): Promise<IClient> {
    const [error, result] = await handleRepo(
      this.orm.client.findFirst({
        where: {
          email,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.orm.$disconnect;

    return result;
  }
  async listActiveClient(): Promise<IClient[]> {
    const [error, result] = await handleRepo(this.orm.client.findMany());
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.orm.$disconnect;

    return result;
  }
  async listOnlyAdmin(): Promise<IClient[]> {
    const [error, result] = await handleRepo(
      this.orm.client.findMany({
        where: {
          role: "ADMIN",
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.orm.$disconnect;

    return result;
  }
  async softDeleteClient(id: string): Promise<void> {
    const [error, result] = await handleRepo(
      this.orm.client.update({
        data: {
          active: false,
        },
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

    this.orm.$disconnect;

    return result;
  }
  async hardDeleteClient(id: string): Promise<void> {
    console.log(id);

    const [error, result] = await handleRepo(
      this.orm.client.delete({
        where: {
          id: id,
        },
      })
    );
    console.log(error);

    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.orm.$disconnect;

    return result;
  }
}
export { ClientRepository };
