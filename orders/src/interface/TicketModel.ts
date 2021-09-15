import { Model } from "mongoose";
import { TicketAttributesInterface } from "./TicketAttributes";
import { TicketDocInterface } from "./TicketDoc";

export interface TicketModelInterface extends Model<TicketDocInterface> {
  build(attributes: TicketAttributesInterface): TicketDocInterface;
};