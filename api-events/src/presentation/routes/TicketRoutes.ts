import { Request, Response, Router } from "express";
import { TicketController } from "../controller/TicketController";

export const ticketRouter = Router();
const ticketController = new TicketController();

ticketRouter.delete("/deleteTicket", (request: Request, response: Response) =>
  ticketController.hardDeleteTicket(request, response)
);

ticketRouter.put("/updatePrice", (request: Request, response: Response) =>
  ticketController.updateEventTicketPrice(request, response)
);

ticketRouter.get("/event/:eventId", (request: Request, response: Response) =>
  ticketController.everyEventTicketsController(request, response)
);

ticketRouter.post("/newTicket", (request: Request, response: Response) =>
  ticketController.createTicketController(request, response)
);

ticketRouter.get("/:ticketId", (request: Request, response: Response) =>
  ticketController.retriveTicketController(request, response)
);
