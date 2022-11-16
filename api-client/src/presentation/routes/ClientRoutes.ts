import { Request, Response, Router } from "express";
import { ClientController } from "../controller/ClientController";

export const clientRouter = Router();
const clientController = new ClientController();

clientRouter.put("/softDelete/:id", (request: Request, response: Response) =>
  clientController.softDeleteClient(request, response)
);

clientRouter.delete("/hardDelete/:id", (request: Request, response: Response) =>
  clientController.hardDeleteClient(request, response)
);
clientRouter.get("/listAdmin", (request: Request, response: Response) =>
  clientController.listClientsAdmin(request, response)
);
clientRouter.get("/byEmail", (request: Request, response: Response) =>
  clientController.getClientByEmail(request, response)
);

clientRouter.post("/newClient", (request: Request, response: Response) =>
  clientController.createNewClient(request, response)
);

clientRouter.post("/newAdmin", (request: Request, response: Response) =>
  clientController.createNewAdminClient(request, response)
);

clientRouter.get("/:id", (request: Request, response: Response) =>
  clientController.getClientById(request, response)
);

clientRouter.get("/", (request: Request, response: Response) =>
  clientController.listClients(request, response)
);
