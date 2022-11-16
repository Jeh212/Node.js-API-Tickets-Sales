import { Request, Response } from "express";
import { ICart } from "../../../entities/ICart";
export interface ApiResponse {
  msg: string;
  data: ICart[] | ICart | void;
}

interface ICartController {
  newCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  myCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  getCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  updateCartTotalController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  updateCartAmoutItemsController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;

  activeAndDesactivateCartController(
    request: Request,
    response: Response
  ): Promise<Response<ApiResponse>>;
}
export { ICartController };
