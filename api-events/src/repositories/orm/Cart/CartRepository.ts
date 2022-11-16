import { ICart } from "../../../entities/ICart";
import { ormClient } from "../../../infra/database/ormClient";
import { ApiError, HttpCode } from "../../../utils/ApiError";
import { handleRepo } from "../../../utils/handleRepo";
import { ICartRepository } from "../../protocols/ICartRepository";

class CartRepository implements ICartRepository {
  private readonly ormRepository = ormClient;

  async getClientCart(clientId: string): Promise<ICart> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cart.findFirst({
        where: {
          clientId: clientId,
        },
        include: {
          cartItems: true,
        },
      })
    );
    if (error) {
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );
    }

    return result;
  }

  async createCart({
    active,
    amountItems,
    clientId,
    createdAt = new Date(),
    total,
  }: Omit<ICart, "cartId">): Promise<ICart> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cart.create({
        data: {
          active,
          amountItems,
          clientId,
          createdAt,
          total,
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
  async getCartById(cartId: string): Promise<ICart> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cart.findFirst({
        where: {
          cartId,
        },
        include: {
          cartItems: true,
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
  async updateCartTotal(cartId: string, totalAmout: number): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cart.update({
        data: {
          total: totalAmout,
          updatedAt: new Date(),
        },
        where: {
          cartId,
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

  async updateCartAmoutItems(
    cartId: string,
    amountItems: number
  ): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cart.update({
        data: {
          amountItems,
          updatedAt: new Date(),
        },
        where: {
          cartId,
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

  async updateCartIsActive(cartId: string, active: boolean): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cart.update({
        data: {
          active,
          updatedAt: new Date(),
        },
        where: {
          cartId,
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
  async deleteCart(cartId: string): Promise<void> {
    this.ormRepository.$connect;

    const [error, result] = await handleRepo(
      this.ormRepository.cart.delete({
        where: {
          cartId,
        },
      })
    );
    console.log(error);

    if (error)
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpCode.INTERNAL_SERVER_ERROR
      );

    this.ormRepository.$disconnect;

    return result;
  }
}

export { CartRepository };
