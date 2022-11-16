import { Request, Response, Router } from "express";
import { CartController } from "../controller/CartController";
export const cartRouter = Router();

const cartController = new CartController();

cartRouter.post("/new", (request: Request, response: Response) =>
  cartController.newCartController(request, response)
);

cartRouter.get("/my/:clientId", (request: Request, response: Response) =>
  cartController.myCartController(request, response)
);

cartRouter.get("/:cartId", (request: Request, response: Response) =>
  cartController.getCartController(request, response)
);

cartRouter.put("/updateTotal", (request: Request, response: Response) =>
  cartController.updateCartTotalController(request, response)
);

cartRouter.put("/updateAmountItems", (request: Request, response: Response) =>
  cartController.updateCartAmoutItemsController(request, response)
);

cartRouter.delete("/desativeCart", (request: Request, response: Response) =>
  cartController.activeAndDesactivateCartController(request, response)
);
