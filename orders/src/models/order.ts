import { OrderStatus } from "@tanweerhossain/common";
import { model, Schema } from "mongoose";
import { OrderAttributesInterface } from "../interface/OrderAttributes";
import { OrderDocumentInterface } from "../interface/OrderDocument";
import { OrderModelInterface } from "../interface/OrderModel";

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
  expiresAt: {
    type: Schema.Types.Date,
    require: true
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket'
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;

      delete ret._id;
    }
  }
});

orderSchema.statics.build = (attributes: OrderAttributesInterface):
  OrderDocumentInterface => {
  return new Order(attributes);
};

const Order = model<OrderDocumentInterface, OrderModelInterface>('Order', orderSchema);

export { orderSchema, Order };