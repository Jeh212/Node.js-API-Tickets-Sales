import { Request, Response, Router } from "express";
import { OrganizerController } from "../controller/OrganizerController";

export const organizerRouter = Router();

const organizerController = new OrganizerController();

organizerRouter.put("/update", (request: Request, response: Response) =>
  organizerController.updateOrganizerInfoController(request, response)
);

organizerRouter.post("/new", (request: Request, response: Response) =>
  organizerController.newOrganizerController(request, response)
);

organizerRouter.get("/:cnpj", (request: Request, response: Response) =>
  organizerController.findOrganizerByCNPJController(request, response)
);
