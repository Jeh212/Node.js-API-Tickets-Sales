"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionTokens = void 0;
const tsyringe_1 = require("tsyringe");
const CartItemRepository_1 = require("../src/repositories/orm/Cart/CartItemRepository");
const CartRepository_1 = require("../src/repositories/orm/Cart/CartRepository");
const EventRepository_1 = require("../src/repositories/orm/Event/EventRepository");
const OrganizerRepository_1 = require("../src/repositories/orm/Event/OrganizerRepository");
const TicketRepository_1 = require("../src/repositories/orm/Ticket/TicketRepository");
var InjectionTokens;
(function (InjectionTokens) {
    InjectionTokens["TICKET_REPO"] = "TicketRepo";
    InjectionTokens["EVENT_REPO"] = "EventRepo";
    InjectionTokens["ORGAN_REPO"] = "OrganRepo";
    InjectionTokens["CART_REPO"] = "CartRepo";
    InjectionTokens["CART_ITEM_REPO"] = "CartItemRepo";
})(InjectionTokens = exports.InjectionTokens || (exports.InjectionTokens = {}));
tsyringe_1.container.registerSingleton(InjectionTokens.TICKET_REPO, TicketRepository_1.TicketRepository);
tsyringe_1.container.registerSingleton(InjectionTokens.EVENT_REPO, EventRepository_1.EventRepository);
tsyringe_1.container.registerSingleton(InjectionTokens.ORGAN_REPO, OrganizerRepository_1.OrganizerRepository);
tsyringe_1.container.registerSingleton(InjectionTokens.CART_REPO, CartRepository_1.CartRepository);
tsyringe_1.container.registerSingleton(InjectionTokens.CART_ITEM_REPO, CartItemRepository_1.CartItemRepository);
