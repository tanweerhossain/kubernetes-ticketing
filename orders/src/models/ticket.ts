import { model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
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
    }
  }
});


ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attributes: TicketAttributesInterface):
  TicketDocInterface => {
  return new Ticket({
    _id: attributes.id,
    title: attributes.title,
    price: attributes.price
  });
};
ticketSchema.statics.findByEvent = async (event: {
  id: string,
  version: number
}): Promise<TicketDocInterface |
  null> => await Ticket.findOne({ _id: event.id, version: event.version - 1 });

export const Ticket = model<TicketDocInterface, TicketModelInterface>('Ticket', ticketSchema);
