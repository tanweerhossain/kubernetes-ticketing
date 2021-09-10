import { Schema } from "mongoose";
import { TicketAttributesInterface } from "../interface/TicketAttributes";
import { TicketDocInterface } from "../interface/TicketDoc";
import { Ticket } from "./ticket";

export const ticketPlugins = (ticketSchema: Schema): void => {
  ticketSchema
    .statics
    .build = (attributes: TicketAttributesInterface):
      TicketDocInterface => {
      return new Ticket(attributes);
    };
};