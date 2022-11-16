import { Router } from "express";
import { clientRouter } from "./ClientRoutes";

const indexRouter = Router();

indexRouter.use("/client", clientRouter);

export { indexRouter };
