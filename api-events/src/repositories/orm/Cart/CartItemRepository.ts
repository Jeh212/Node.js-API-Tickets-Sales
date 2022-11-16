import { CartItems } from "../../../entities/ICartItem";
import { ormClient } from "../../../infra/database/ormClient";
import { ApiError, HttpCode } from "../../../utils/ApiError";
import { handleRepo } from "../../../utils/handleRepo";
import { ICartItemRepository } from "../../protocols/ICartItemRepository";

class CartItemRepository implements ICartItemRepository {
  private readonly ormRepository = ormClient;

  async addItem(
    cartId: string,
    ticketId: string,
    expiredDate: Date
  ): Promise<CartItems> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cartItems.create({
        data: {
          cartCartId: cartId,
          ticketId,
          expiredDate,
          createdAt: new Date(),
        },
        select: {
          itemCartId: true,
          ticketId: true,
          createdAt: true,
          expiredDate: true,
          Cart: true,
        },
      })
    );
    console.log(error);

    if (error) {
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );
    }

    this.ormRepository.$disconnect;

    return result;
  }

  async removeAllItems(cartId: string): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cartItems.deleteMany({
        where: {
          cartCartId: cartId,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }

  async removeItem(itemCartId: string): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cartItems.delete({
        where: {
          itemCartId,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }

  async countManyItemsInCart(cartId: string): Promise<number> {
    this.ormRepository.$connect;

    const [error, total] = await handleRepo(
      this.ormRepository.cartItems.count({
        where: {
          cartCartId: cartId,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return total;
  }

  async listAllCartItems(cartId: string): Promise<CartItems[]> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cartItems.findMany({
        where: {
          cartCartId: cartId,
        },
      })
    );
    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }
}

export { CartItemRepository };
