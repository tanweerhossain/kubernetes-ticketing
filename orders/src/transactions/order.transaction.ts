import { DatabaseConnectionError, OrderStatus } from "@tanweerhossain/common";
import { response } from "express";
import { LeanDocument } from "mongoose";
import { OrderAttributesInterface } from "../interface/OrderAttributes";
import { OrderDocumentInterface } from "../interface/OrderDocument";
import { TicketDocInterface } from "../interface/TicketDoc";
import { Order } from "../models/order";

export const IsTicketReserved = async (
  ticket: TicketDocInterface):
  Promise<boolean> => {
  try {
    const result:
      OrderDocumentInterface |
      null = await Order.findOne({
        ticket,
        $or: [
          { status: OrderStatus.Created },
          { status: OrderStatus.AwaitingPaymant },
          { status: OrderStatus.Completed }
        ]
      });

    return !!result;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch ticket reserved status');
  }
};

export const createOrder = async (
  order: OrderAttributesInterface):
  Promise<OrderDocumentInterface | null> => {
  try {
    let result:
      OrderDocumentInterface |
      null = Order.build(order);

    result = await result.save();

    if (!!result) return result;

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to create order');
  }
};

export const fetchOrders = async (
  userId: string):
  Promise<OrderDocumentInterface[] |
    null> => {
  try {
    let result:
      OrderDocumentInterface[] = await Order.find({ userId }).populate('ticket');

    if (!!result) {
      return result;
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch orders');
  }
};

export const getOrderByIdAndUser = async (
  orderId: string,
  userId: string):
  Promise<OrderDocumentInterface |
    null> => {
  try {
    let result:
      OrderDocumentInterface | null = await Order
        .findOne({ _id: orderId, userId })
        .populate('ticket');

    if (!!result) {
      return result;
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch order');
  }
};

export const getOrderById = async (
  orderId: string):
  Promise<OrderDocumentInterface |
    null> => {
  try {
    let result:
      OrderDocumentInterface | null = await Order
        .findOne({ _id: orderId })
        .populate('ticket');

    if (!!result) {
      return result;
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch order');
  }
};