import { inject, injectable } from "tsyringe";
import { InjectionTokens } from "../../../container";
import { CartItems } from "../../entities/ICartItem";
import { ICartItemRepository } from "../../repositories/protocols/ICartItemRepository";
import { ICartRepository } from "../../repositories/protocols/ICartRepository";
import { ITicketRepository } from "../../repositories/protocols/ITicketRepository";
import { ApiError, HttpCode } from "../../utils/ApiError";
import { ICartItemsService } from "../protocols/ICartItemsService";

@injectable()
class CartItemsService implements ICartItemsService {
  constructor(
    @inject(InjectionTokens.CART_REPO)
    private readonly cartRepository: ICartRepository,

    @inject(InjectionTokens.CART_ITEM_REPO)
    private readonly cartItemsRepository: ICartItemRepository,

    @inject(InjectionTokens.TICKET_REPO)
    private readonly ticketRepo: ITicketRepository
  ) {}

  async addItem(cartId: string, ticketId: string): Promise<CartItems> {
    const cartAlreadyCreated = await this.cartRepository.getCartById(cartId);

    if (!cartAlreadyCreated) {
      throw new ApiError("Cart not created!", HttpCode.BAD_REQUEST);
    }

    const tickets = await this.ticketRepo.getTicket(ticketId);

    if (!tickets) {
      throw new ApiError("Tickets not Found!", HttpCode.NOT_FOUND);
    }

    const expiredDate = new Date(tickets.ticketExpireDate);

    const createItem = await this.cartItemsRepository.addItem(
      cartId,
      ticketId,
      expiredDate
    );
    return createItem;
  }
  async cleanCart(cartId: string): Promise<void> {
    const cartAlreadyCreated = await this.cartRepository.getCartById(cartId);
    console.log(cartAlreadyCreated);

    if (!cartAlreadyCreated) {
      throw new ApiError("Cart not found", HttpCode.NOT_FOUND);
    }

    await this.cartItemsRepository.removeAllItems(cartId);

    return;
  }
  async removeOneItem(itemCartId: string, cartId: string): Promise<void> {
    const cartAlreadyCreated = await this.cartRepository.getCartById(cartId);

    if (!cartAlreadyCreated) {
      throw new ApiError("Cart not found", HttpCode.NOT_FOUND);
    }

    await this.cartItemsRepository.removeItem(itemCartId);

    return;
  }

  async totalItemsInCart(cartId: string): Promise<number> {
    const cartAlreadyCreated = await this.cartRepository.getCartById(cartId);

    if (!cartAlreadyCreated) {
      throw new ApiError("Cart not found", HttpCode.NOT_FOUND);
    }

    return await this.cartItemsRepository.countManyItemsInCart(cartId);
  }

  async allItemsInCart(cartId: string): Promise<CartItems[]> {
    const cartAlreadyCreated = await this.cartRepository.getCartById(cartId);

    if (!cartAlreadyCreated) {
      throw new ApiError("Cart not found", HttpCode.NOT_FOUND);
    }

    return await this.cartItemsRepository.listAllCartItems(cartId);
  }
}

export { CartItemsService };
