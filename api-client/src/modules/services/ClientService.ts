import { inject, injectable } from "tsyringe";
import { InjectionTokenName } from "../../../container";
import { IClient } from "../../entities/IClient";
import {
  IClientRepository,
  NewClientData,
} from "../../repositories/protocol/IClientRepository";
import { ApiError, HttpCode } from "../../utils/ApiError";

@injectable()
class ClientService {
  constructor(
    @inject(InjectionTokenName.CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository
  ) {}

  async newClient({ email, name, password }: NewClientData): Promise<IClient> {
    const create = await this.clientRepository.persistOrdinaryClient({
      email,
      name,
      password,
    });

    return create;
  }

  async newAdminClient({
    email,
    name,
    password,
  }: NewClientData): Promise<IClient> {
    const isExistClient = await this.clientRepository.getClientByEmail(email);

    if (isExistClient) {
      throw new ApiError("Email already in Use", HttpCode.CONFLICT);
    }

    const create = await this.clientRepository.persisteNewAdmin({
      email,
      name,
      password,
    });

    return create;
  }

  async getClientById(id: string): Promise<IClient> {
    const getClient = await this.clientRepository.getClientById(id);

    if (!getClient) {
      throw new ApiError("Client Not Found!", HttpCode.NOT_FOUND);
    }

    return getClient;
  }

  async getClientByEmail(email: string): Promise<IClient> {
    const findClientByEmail = await this.clientRepository.getClientByEmail(
      email
    );

    if (!findClientByEmail) {
      console.log("email");

      throw new ApiError("Client Not Found!", HttpCode.NOT_FOUND);
    }

    return findClientByEmail;
  }

  async listAllClient(): Promise<IClient[]> {
    const allClients = await this.clientRepository.listActiveClient();

    if (allClients.length === 0) {
      throw new ApiError("No Clients Active!", HttpCode.NOT_FOUND);
    }

    return allClients;
  }

  async listOnlyAdmin() {
    const allAdmins = await this.clientRepository.listOnlyAdmin();

    if (allAdmins.length === 0) {
      throw new ApiError("No Clients Active!", HttpCode.NOT_FOUND);
    }

    return allAdmins;
  }

  async softDelete(id: string): Promise<void> {
    const findById = await this.clientRepository.getClientById(id);

    if (!findById) {
      throw new ApiError("Client Not Found!", HttpCode.NOT_FOUND);
    }

    await this.clientRepository.softDeleteClient(id);

    return;
  }

  async hardDelete(id: string): Promise<void> {
    const findById = await this.clientRepository.getClientById(id);

    if (!findById) {
      throw new ApiError("Client Not Found!", HttpCode.NOT_FOUND);
    }

    await this.clientRepository.hardDeleteClient(id);

    return;
  }
}

export { ClientService };
