import { ICart } from "../../entities/ICart";

interface ICartRepository {
  createCart(data: Omit<ICart, "cartId">): Promise<ICart>;
  getCartById(cartId: string): Promise<ICart>;
  updateCartTotal(cartId: string, totalAmout: number): Promise<void>;
  updateCartAmoutItems(cartId: string, amountItems: number): Promise<void>;
  updateCartIsActive(cartId: string, active: boolean): Promise<void>;
  deleteCart(cartId: string): Promise<void>;
  getClientCart(clientId: string): Promise<ICart>;
}
export { ICartRepository };
