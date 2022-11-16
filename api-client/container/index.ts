import { container } from "tsyringe";
import { ClientRepository } from "../src/repositories/orm/ClientRepository";
import { IClientRepository } from "../src/repositories/protocol/IClientRepository";

export enum InjectionTokenName {
  CLIENT_REPOSITORY = "ClientRepo",
}

container.registerSingleton<IClientRepository>(
  InjectionTokenName.CLIENT_REPOSITORY,
  ClientRepository
);
