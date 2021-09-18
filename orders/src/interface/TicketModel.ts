import { Model } from "mongoose";
import { TicketAttributesInterface } from "./TicketAttributes";
import { TicketDocInterface } from "./TicketDoc";

export interface TicketModelInterface extends Model<TicketDocInterface> {
  build(attributes: TicketAttributesInterface): TicketDocInterface;
  findByEvent(event: { id: string, version: number }): Promise<TicketDocInterface | null>;
};