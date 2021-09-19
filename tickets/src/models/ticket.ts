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
  },
  orderId: {
    type: String
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;

      delete ret._id;
    }
  }
});

ticketPlugins(ticketSchema);

export const Ticket = model<TicketDocInterface, TicketModelInterface>('Ticket', ticketSchema);
