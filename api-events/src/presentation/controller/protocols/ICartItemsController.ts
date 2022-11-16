import { Request, Response } from "express";
import { CartItems } from "../../../entities/ICartItem";

export interface ApiResponse {
  msg: string;
  data: CartItems[] | CartItems | void;
}

interface ICartItemsController {
  addItemController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  cleanCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  removeOneItemController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  totalOfItemInCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  allItemsInController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
}

export { ICartItemsController };
