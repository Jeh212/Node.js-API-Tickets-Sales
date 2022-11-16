import { Request, Response } from "express";
import { container } from "tsyringe";
import { CartItemsService } from "../../modules/services/CartItemsService";
import {
  ApiResponse,
  ICartItemsController,
} from "./protocols/ICartItemsController";

class CartItemsController implements ICartItemsController {
  async addItemController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId, ticketId } = request.body;

      const cartItemService = container.resolve(CartItemsService);

      const item = await cartItemService.addItem(cartId, ticketId);

      return response.json({
        msg: "ok",
        data: item,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async cleanCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId } = request.params;

      const cartItemService = container.resolve(CartItemsService);

      await cartItemService.cleanCart(cartId);

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async removeOneItemController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId, itemCartId } = request.body;

      const cartItemService = container.resolve(CartItemsService);

      await cartItemService.removeOneItem(itemCartId, cartId);

      return response.json({
        msg: "ok",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async totalOfItemInCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId } = request.params;

      const cartItemService = container.resolve(CartItemsService);

      const totalItems = cartItemService.totalItemsInCart(cartId);

      return response.json({
        msg: "ok",
        data: totalItems,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
  async allItemsInController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>> {
    try {
      const { cartId } = request.params;

      const cartItemService = container.resolve(CartItemsService);

      const items = cartItemService.allItemsInCart(cartId);

      return response.json({
        msg: "ok",
        data: items,
      });
    } catch (error: any) {
      return response
        .status(error.statusCode)
        .json({ errorCode: error.statusCode, ApiMessage: error.message });
    }
  }
}
export { CartItemsController };
