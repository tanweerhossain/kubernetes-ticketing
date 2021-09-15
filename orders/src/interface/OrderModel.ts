import { TicketAttributesInterface } from "@tanweerhossain/common";
import { Model } from "mongoose";
import { OrderAttributesInterface } from "./OrderAttributes";
import { OrderDocumentInterface } from "./OrderDocument";

export interface OrderModelInterface extends Model<OrderDocumentInterface> {
  build(attributes: OrderAttributesInterface): OrderDocumentInterface;
};