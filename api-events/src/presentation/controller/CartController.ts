import { Request, Response } from "express";

import { container } from "tsyringe";
import { CartService } from "../../modules/services/CartService";
import { ApiResponse, ICartController } from "./protocols/ICartController";

class CartController implements ICartController {
  async newCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { active, amountItems, clientId, total } = request.body;

      const cartService = container.resolve(CartService);

      const createCart = await cartService.newCart({
        active,
        amountItems,
        clientId,
        total,
      });

      return response.json({
        msg: "ok",
        data: createCart,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async myCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { clientId } = request.params;

      const cartService = container.resolve(CartService);

      const myCart = await cartService.myCart(clientId);

      return response.json({
        msg: "ok",
        data: myCart,
      });
    } catch (error: any) {
      return response

        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async getCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId } = request.params;

      const cartService = container.resolve(CartService);

      const cart = await cartService.getCart(cartId);

      return response.json({
        msg: "ok",
        data: cart,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async updateCartTotalController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId, totalAmout } = request.body;

      const cartService = container.resolve(CartService);

      await cartService.updateCartTotal(cartId, totalAmout);

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async updateCartAmoutItemsController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId } = request.body;

      const cartService = container.resolve(CartService);

      await cartService.updateCartAmoutItems(cartId);

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async activeAndDesactivateCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId, active } = request.body;

      const cartService = container.resolve(CartService);

      await cartService.updateCartTotal(cartId, active);

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
}
export { CartController };
