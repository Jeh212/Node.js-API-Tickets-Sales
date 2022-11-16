import { Request, Response, Router } from "express";
import { CartItemsController } from "../controller/CartItemsController";

export const cartItemRouter = Router();

const cartItemController = new CartItemsController();

cartItemRouter.post("/new", (request: Request, response: Response) =>
  cartItemController.addItemController(request, response)
);

cartItemRouter.delete(
  "/clean/:cartId",
  (request: Request, response: Response) =>
    cartItemController.cleanCartController(request, response)
);

cartItemRouter.delete("/removeItem", (request: Request, response: Response) =>
  cartItemController.removeOneItemController(request, response)
);

cartItemRouter.get("/", (request: Request, response: Response) =>
  cartItemController.allItemsInController(request, response)
);
