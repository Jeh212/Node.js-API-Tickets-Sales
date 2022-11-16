import { CartItems } from "../../entities/ICartItem";

interface ICartItemRepository {
  addItem(
    cartId: string,
    ticketId: string,
    expiredDate: Date
  ): Promise<CartItems>;
  removeItem(itemCartId: string): Promise<void>;
  countManyItemsInCart(cartId: string): Promise<number>;
  listAllCartItems(cartId: string): Promise<CartItems[]>;
  removeAllItems(cartId: string): Promise<void>;
}

export { ICartItemRepository };
