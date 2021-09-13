import { Schema } from "mongoose";
import { TicketAttributesInterface } from "@tanweerhossain/common";
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