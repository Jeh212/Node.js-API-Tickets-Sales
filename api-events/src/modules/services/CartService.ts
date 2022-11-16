import { inject, injectable } from "tsyringe";
import { InjectionTokens } from "../../../container";
import { ICart } from "../../entities/ICart";
import { ICartItemRepository } from "../../repositories/protocols/ICartItemRepository";
import { ICartRepository } from "../../repositories/protocols/ICartRepository";
import { ApiError, HttpCode } from "../../utils/ApiError";
import { ICartService } from "../protocols/ICartService";

@injectable()
class CartService implements ICartService {
  constructor(
    @inject(InjectionTokens.CART_REPO)
    private readonly cartRepository: ICartRepository,

    @inject(InjectionTokens.CART_ITEM_REPO)
    private readonly cartItemsRepository: ICartItemRepository
  ) {}

  async myCart(clientId: string): Promise<ICart> {
    const alreadyCreatedCart = await this.cartRepository.getClientCart(
      clientId
    );

    if (!alreadyCreatedCart)
      throw new ApiError("Cart not found", HttpCode.NOT_FOUND);

    return alreadyCreatedCart;
  }

  async newCart({
    active,
    amountItems,
    clientId,
    createdAt = new Date(),
    total,
  }: Omit<ICart, "cartId">): Promise<ICart> {
    const alreadyCreatedCart = await this.cartRepository.getClientCart(
      clientId
    );

    if (alreadyCreatedCart)
      throw new ApiError("Cart already exist!", HttpCode.BAD_REQUEST);

    const newCart = await this.cartRepository.createCart({
      active,
      amountItems,
      clientId,
      total,
      createdAt,
    });

    return newCart;
  }

  async getCart(cartId: string): Promise<ICart> {
    const foundCart = await this.cartRepository.getCartById(cartId);

    if (!foundCart) throw new ApiError("Cart not found", HttpCode.NOT_FOUND);

    return foundCart;
  }

  async updateCartTotal(cartId: string, totalAmout: number): Promise<void> {
    const cart = await this.cartRepository.getCartById(cartId);

    if (!cart) throw new ApiError("Cart not found", HttpCode.NOT_FOUND);

    await this.cartRepository.updateCartTotal(cartId, totalAmout);

    return;
  }

  async updateCartAmoutItems(cartId: string): Promise<void> {
    const cart = await this.cartRepository.getCartById(cartId);

    if (!cart) throw new ApiError("Cart not found", HttpCode.NOT_FOUND);

    const amountOfItemsInCart =
      await this.cartItemsRepository.countManyItemsInCart(cartId);

    if (amountOfItemsInCart === 0) {
      throw new ApiError("Cart Empty", HttpCode.NOT_FOUND);
    }

    await this.cartRepository.updateCartTotal(cartId, amountOfItemsInCart);

    return;
  }

  async activeAndDesactivateCart(
    cartId: string,
    active: boolean
  ): Promise<void> {
    const cart = await this.cartRepository.getCartById(cartId);

    if (!cart) throw new ApiError("Cart not found", HttpCode.NOT_FOUND);

    if (cart.active === true)
      throw new ApiError("Cart already activated", HttpCode.CONFLICT);

    await this.cartRepository.updateCartIsActive(cartId, active);

    return;
  }
}
export { CartService };
