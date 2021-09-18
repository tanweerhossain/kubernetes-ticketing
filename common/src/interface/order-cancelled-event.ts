
import { Event } from "./event";
import { Subjects } from "../enums/subjects";
import { OrderStatus } from "../enums/order-status";

export interface OrderCancelledEvent extends Event {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    }
  };
};