import { Document } from "mongoose";

export interface PaymentDocInterface extends Document {
  stripeId: string;
  orderId: string;
  // If write write operation between service is required then include version
  // version: number;
};