import { OrderStatus } from "@tanweerhossain/common";
import { Document } from "mongoose";

export interface OrderDocInterface extends Document {
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
};