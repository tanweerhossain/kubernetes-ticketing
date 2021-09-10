import { model, Schema } from "mongoose";
import { TicketDocInterface } from "../interface/TicketDoc";
import { TicketModelInterface } from "../interface/TicketModel";
import { ticketPlugins } from "./plugins";

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;

      delete ret._id;
    },
    versionKey: false
  }
});

ticketPlugins(ticketSchema);

export const Ticket = model<TicketDocInterface, TicketModelInterface>('Ticket', ticketSchema);