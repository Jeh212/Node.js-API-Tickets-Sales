import { container } from "tsyringe";
import { CartItemRepository } from "../src/repositories/orm/Cart/CartItemRepository";
import { CartRepository } from "../src/repositories/orm/Cart/CartRepository";
import { EventRepository } from "../src/repositories/orm/Event/EventRepository";
import { OrganizerRepository } from "../src/repositories/orm/Event/OrganizerRepository";
import { TicketRepository } from "../src/repositories/orm/Ticket/TicketRepository";
import { ICartItemRepository } from "../src/repositories/protocols/ICartItemRepository";
import { ICartRepository } from "../src/repositories/protocols/ICartRepository";

import { IEventRepository } from "../src/repositories/protocols/IEventRepository";
import { IOrganizerRepository } from "../src/repositories/protocols/IOrganizer";
import { ITicketRepository } from "../src/repositories/protocols/ITicketRepository";

export enum InjectionTokens {
  TICKET_REPO = "TicketRepo",
  EVENT_REPO = "EventRepo",
  ORGAN_REPO = "OrganRepo",
  CART_REPO = "CartRepo",
  CART_ITEM_REPO = "CartItemRepo",
}

container.registerSingleton<ITicketRepository>(
  InjectionTokens.TICKET_REPO,
  TicketRepository
);

container.registerSingleton<IEventRepository>(
  InjectionTokens.EVENT_REPO,
  EventRepository
);

container.registerSingleton<IOrganizerRepository>(
  InjectionTokens.ORGAN_REPO,
  OrganizerRepository
);

container.registerSingleton<ICartRepository>(
  InjectionTokens.CART_REPO,
  CartRepository
);

container.registerSingleton<ICartItemRepository>(
  InjectionTokens.CART_ITEM_REPO,
  CartItemRepository
);
