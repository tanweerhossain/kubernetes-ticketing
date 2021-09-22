import { model, Schema } from "mongoose";
import { PaymentAttrsInterface } from "../interface/PaymentAttrsInterface";
import { PaymentDocInterface } from "../interface/PaymentDocInterface";
import { PaymentModelInterface } from "../interface/PaymentModelInterface";

const paymentSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  stripeId: {
    type: String,
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

paymentSchema
  .statics
  .build = (attrs: PaymentAttrsInterface) => new Payment(attrs);

export const Payment = model<PaymentDocInterface, PaymentModelInterface>('Payment', paymentSchema);