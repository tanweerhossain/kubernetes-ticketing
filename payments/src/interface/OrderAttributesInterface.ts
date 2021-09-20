import { OrderStatus } from "@tanweerhossain/common";

export interface OrderAttributesInterface {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
};