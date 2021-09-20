import { DatabaseConnectionError } from "@tanweerhossain/common";
import { OrderAttributesInterface } from "../interface/OrderAttributesInterface";
import { OrderDocInterface } from "../interface/OrderDocInterface";
import { Order } from "../models/order";


export const createOrder = async (
  order: OrderAttributesInterface):
  Promise<OrderDocInterface | null> => {
  try {
    let result:
      OrderDocInterface = Order.build(order);

    await result.save();

    if (!!result) return result;

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to create order');
  }
};

export const getOrderById = async (
  orderId: string,
  version: number | undefined = undefined):
  Promise<OrderDocInterface |
    null> => {
  try {
    let result:
      OrderDocInterface |
      null = version
        ? await Order.findOne({ _id: orderId, version })
        : await Order.findOne({ _id: orderId });

    if (!!result) return result;

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch order');
  }
};