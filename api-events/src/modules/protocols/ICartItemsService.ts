import { CartItems } from "../../entities/ICartItem";

interface ICartItemsService {
  addItem(cartId: string, ticketId: string): Promise<CartItems>;
  cleanCart(cartId: string): Promise<void>;
  removeOneItem(itemCartId: string, cartId: string): Promise<void>;
  totalItemsInCart(cartId: string): Promise<number>;
  allItemsInCart(cartId: string): Promise<CartItems[]>;
}
export { ICartItemsService };
