import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { container } from "tsyringe";
import { OrganizerService } from "../../modules/services/OrganizerService";
import {
  ApiResponse,
  IOrganizerController,
} from "./protocols/IOrganizerController";

class OrganizerController implements IOrganizerController {
  async newOrganizerController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { name, email, fantasyName, cnpj } = request.body;

      const organizerService = container.resolve(OrganizerService);

      await organizerService.newOrganizer({
        name,
        email,
        fantasyName,
        cnpj,
      });

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async findOrganizerByCNPJController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cnpj } = request.params;

      const organizerService = container.resolve(OrganizerService);

      const organizer = await organizerService.retriveOrganizer(cnpj);

      return response.json({
        msg: "ok",
        data: organizer,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async updateOrganizerInfoController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { name, email, fantasyName, cnpj } = request.body;
      console.log(request.body);

      const organizerService = container.resolve(OrganizerService);
      await organizerService.updateOrganizer(cnpj, {
        name,
        email,
        fantasyName,
        cnpj,
      });

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      console.log(error);

      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
}
export { OrganizerController };
