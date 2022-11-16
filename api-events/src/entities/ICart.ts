// interface ITicket {
//   ticketId: string;
//   ticketPrice: number;
//   ticketRate: number;
//   ticketEventBatch: number;
//   ticketAmountAvailable: number;
//   relatedEventId: string;
// }

import { CartItems } from "./ICartItem";

interface ICart {
  cartId: string;
  amountItems: number;
  total: number;
  active: boolean;
  clientId: string;
  createdAt?: Date;
  updatedAt?: Date;
  cartItems?: CartItems[];
}
export { ICart };
