import { model, Schema } from "mongoose";
import { TicketAttributesInterface } from "../interface/TicketAttributes";
import { TicketDocInterface } from "../interface/TicketDoc";
import { TicketModelInterface } from "../interface/TicketModel";

export const ticketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
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


ticketSchema.statics.build = (attributes: TicketAttributesInterface):
  TicketDocInterface => {
  return new Ticket({
    _id: attributes.id,
    title: attributes.title,
    price: attributes.price
  });
};

export const Ticket = model<TicketDocInterface, TicketModelInterface>('Ticket', ticketSchema);
