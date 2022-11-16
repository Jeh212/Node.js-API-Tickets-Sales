import { Router } from "express";
import { cartItemRouter } from "./CartItemsRoutes";
import { cartRouter } from "./CartRoutes";
import { eventsRouter } from "./EventsRoutes";
import { organizerRouter } from "./OrganizerRoutes";
import { ticketRouter } from "./TicketRoutes";

const indexRouter = Router();

indexRouter.use("/event", eventsRouter);
indexRouter.use("/event/ticket", ticketRouter);
indexRouter.use("/organizer", organizerRouter);
indexRouter.use("/cart", cartRouter);
indexRouter.use("/cart/items", cartItemRouter);

export { indexRouter };
