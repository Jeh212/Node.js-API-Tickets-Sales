import { Request, Response } from "express";
import { container } from "tsyringe";
import { IClient } from "../../entities/IClient";
import { ClientService } from "../../modules/services/ClientService";
import { HttpCode } from "../../utils/ApiError";
export class ClientController {
  async createNewClient(
    request: Request,
    response: Response
  ): Promise<Response<string>> {
    try {
      const { name, email, password } = request.body;

      const clientService = container.resolve(ClientService);

      await clientService.newClient({
        name,
        email,
        password,
      });

      return response.sendStatus(HttpCode.NO_CONTENT);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async createNewAdminClient(
    request: Request,
    response: Response
  ): Promise<Response<string>> {
    try {
      const { name, email, password } = request.body;

      const clientService = container.resolve(ClientService);

      await clientService.newAdminClient({
        name,
        email,
        password,
      });

      return response.sendStatus(HttpCode.NO_CONTENT);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async getClientById(
    request: Request,
    response: Response
  ): Promise<Response<string>> {
    try {
      const { id } = request.params;

      const clientService = container.resolve(ClientService);

      const client = await clientService.getClientById(id);

      return response.json(client);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async getClientByEmail(
    request: Request,
    response: Response
  ): Promise<Response<IClient>> {
    try {
      const { email } = request.body;

      const clientService = container.resolve(ClientService);

      const client = await clientService.getClientByEmail(email);

      return response.json(client);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async listClients(
    request: Request,
    response: Response
  ): Promise<Response<IClient[]>> {
    try {
      const clientService = container.resolve(ClientService);

      const client = await clientService.listAllClient();

      return response.json(client);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async listClientsAdmin(
    request: Request,
    response: Response
  ): Promise<Response<IClient[]>> {
    try {
      const clientService = container.resolve(ClientService);

      const client = await clientService.listOnlyAdmin();

      return response.json(client);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }

  async softDeleteClient(
    request: Request,
    response: Response
  ): Promise<Response<void>> {
    try {
      const { id } = request.params;

      const clientService = container.resolve(ClientService);

      await clientService.softDelete(id);

      return response.sendStatus(HttpCode.NO_CONTENT);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async hardDeleteClient(
    request: Request,
    response: Response
  ): Promise<Response<void>> {
    try {
      const { id } = request.params;

      const clientService = container.resolve(ClientService);

      await clientService.hardDelete(id);

      return response.sendStatus(HttpCode.NO_CONTENT);
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
}
