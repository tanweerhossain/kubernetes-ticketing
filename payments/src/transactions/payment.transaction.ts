import { DatabaseConnectionError } from "@tanweerhossain/common";
import { PaymentAttrsInterface } from "../interface/PaymentAttrsInterface";
import { PaymentDocInterface } from "../interface/PaymentDocInterface";
import { Payment } from "../models/payment";

export const savePayment = async (
  order: PaymentAttrsInterface):
  Promise<PaymentDocInterface | null> => {
  try {
    let result:
      PaymentDocInterface = Payment.build(order);

    await result.save();

    if (!!result) return result;

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to save payment');
  }
};