import { OrderStatus } from "@tanweerhossain/common";
import { TicketDocInterface } from "./TicketDoc";

export interface OrderAttributesInterface {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDocInterface
};