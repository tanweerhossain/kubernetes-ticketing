import { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { TicketAttributesInterface } from "@tanweerhossain/common";
import { TicketDocInterface } from "../interface/TicketDoc";
import { Ticket } from "./ticket";

export const ticketPlugins = (ticketSchema: Schema): void => {
  ticketSchema.set('versionKey', 'version');
  ticketSchema.plugin(updateIfCurrentPlugin);

  ticketSchema
    .statics
    .build = (attributes: TicketAttributesInterface):
      TicketDocInterface => {
      return new Ticket(attributes);
    };
};