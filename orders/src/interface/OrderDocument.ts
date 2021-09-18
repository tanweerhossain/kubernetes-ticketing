import { OrderStatus } from "@tanweerhossain/common";
import { Document } from "mongoose";
import { TicketDocInterface } from "./TicketDoc";

export interface OrderDocumentInterface extends Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  version: number;
  ticket: TicketDocInterface
};