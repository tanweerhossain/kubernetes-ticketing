import { Model } from "mongoose";
import { PaymentAttrsInterface } from "./PaymentAttrsInterface";
import { PaymentDocInterface } from "./PaymentDocInterface";

export interface PaymentModelInterface extends Model<PaymentDocInterface> {
  build(attrs: PaymentAttrsInterface): PaymentDocInterface;
};