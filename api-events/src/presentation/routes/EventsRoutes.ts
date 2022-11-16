import { Request, Response, Router } from "express";
import { EventController } from "../controller/EventController";

export const eventsRouter = Router();

const eventController = new EventController();

eventsRouter.post("/new", (request: Request, response: Response) =>
  eventController.newEventController(request, response)
);

eventsRouter.get("/:eventId", (request: Request, response: Response) =>
  eventController.findEventByIdController(request, response)
);

eventsRouter.get("/?eventTitle", (request: Request, response: Response) =>
  eventController.findEventByIdController(request, response)
);

eventsRouter.put("/update", (request: Request, response: Response) =>
  eventController.updateEventInfoController(request, response)
);

eventsRouter.delete("/update", (request: Request, response: Response) =>
  eventController.removeEvent(request, response)
);
