
import { Event } from "./event";
import { Subjects } from "../enums/subjects";
import { OrderStatus } from "../enums/order-status";

export interface OrderCreatedEvent extends Event {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    userId: string;
    status: OrderStatus;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    }
  };
};