import { IClient } from "../../entities/IClient";

export interface NewClientData {
  name: string;
  email: string;
  password: string;
  role?: string;
}
export interface NewAdmin {
  name: string;
  email: string;
  password: string;
  role?: "admin";
}

interface IClientRepository {
  persistOrdinaryClient({
    email,
    name,
    password,
    role,
  }: NewClientData): Promise<IClient>;
  persisteNewAdmin({ email, name, password, role }: NewAdmin): Promise<IClient>;
  getClientById(id: string): Promise<IClient>;
  getClientByEmail(email: string): Promise<IClient>;
  listActiveClient(): Promise<IClient[]>;
  listOnlyAdmin(): Promise<IClient[]>;
  softDeleteClient(id: string): Promise<void>;
  hardDeleteClient(id: string): Promise<void>;
}
export { IClientRepository };
