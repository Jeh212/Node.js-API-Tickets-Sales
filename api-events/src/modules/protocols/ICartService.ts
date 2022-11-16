import { ICart } from "../../entities/ICart";

interface ICartService {
  newCart({
    active,
    amountItems,
    clientId,
    createdAt,
    total,
    updatedAt,
  }: Omit<ICart, "cartId">): Promise<ICart>;
  getCart(cartId: string): Promise<ICart>;
  updateCartTotal(cartId: string, totalAmout: number): Promise<void>;
  updateCartAmoutItems(cartId: string): Promise<void>;
  activeAndDesactivateCart(cartId: string, active: boolean): Promise<void>;
  myCart(clientId: string): Promise<ICart>;
}
export { ICartService };
