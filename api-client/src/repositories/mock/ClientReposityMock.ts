import { v4 as uuid } from "uuid";
import { IClient } from "../../entities/IClient";
import {
  IClientRepository,
  NewAdmin,
  NewClientData,
} from "../protocol/IClientRepository";
class ClientReposityMock implements IClientRepository {
  private readonly fakeClientRepo: IClient[] = [];

  async persisteNewAdmin({
    email,
    name,
    password,
  }: NewAdmin): Promise<IClient> {
    const newDate = {
      id: uuid(),
      name,
      password,
      email,
      role: "admin",
    };

    this.fakeClientRepo.push(newDate);

    return this.fakeClientRepo[0];
  }
  async persistOrdinaryClient({
    email,
    name,
    password,
  }: NewClientData): Promise<IClient> {
    const newDate = {
      id: uuid(),
      name,
      password,
      email,
      role: "client",
    };

    this.fakeClientRepo.push(newDate);

    return this.fakeClientRepo[0];
  }
  async getClientById(id: string): Promise<IClient> {
    const client = this.fakeClientRepo.find((client) => client.id === id)!!;

    return client;
  }
  async getClientByEmail(email: string): Promise<IClient> {
    const client = this.fakeClientRepo.find(
      (client) => client.email === email
    )!!;

    return client;
  }
  async listActiveClient(): Promise<IClient[]> {
    return this.fakeClientRepo;
  }
  async listOnlyAdmin(): Promise<IClient[]> {
    const onlyAdm = this.fakeClientRepo.filter(
      (client) => client.role === "admin"
    )!!;

    return onlyAdm;
  }
  async softDeleteClient(id: string, email: string | undefined): Promise<void> {
    const client = this.fakeClientRepo.find(
      (client) => client.email === email || client.id === id
    )!!;

    if (client) {
      const newData = {
        ...client,
        active: false,
      };
      this.fakeClientRepo.pop();
      this.fakeClientRepo.push(newData);
    }
    return;
  }
  async hardDeleteClient(id: string, email: string | undefined): Promise<void> {
    const client = this.fakeClientRepo.find(
      (client) => client.email === email || client.id === id
    )!!;

    if (client) {
      const newData = {
        ...client,
        active: false,
      };
      this.fakeClientRepo.pop();
    }
    return;
  }
}

export { ClientReposityMock };
