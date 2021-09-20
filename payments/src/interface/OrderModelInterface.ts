import { Model } from "mongoose";
import { OrderAttributesInterface } from "./OrderAttributesInterface";
import { OrderDocInterface } from "./OrderDocInterface";

export interface OrderModelInterface extends Model<OrderDocInterface> {
  build(attrs: OrderAttributesInterface): OrderDocInterface;
};