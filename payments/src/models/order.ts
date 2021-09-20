import { OrderStatus } from "@tanweerhossain/common";
import { model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderAttributesInterface } from "../interface/OrderAttributesInterface";
import { OrderDocInterface } from "../interface/OrderDocInterface";
import { OrderModelInterface } from "../interface/OrderModelInterface";

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;

      delete ret._id;
    }
  }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttributesInterface):
  OrderDocInterface => {
  return new Order({
    _id: attrs.id,
    userId: attrs.userId,
    price: attrs.price,
    status: attrs.status,
    version: attrs.version
  });
};

export const Order = model<OrderDocInterface, OrderModelInterface>('Order', orderSchema);