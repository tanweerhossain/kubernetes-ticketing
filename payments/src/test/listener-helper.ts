import { BadRequest, OrderCancelledEvent, OrderCreatedEvent, OrderStatus } from "@tanweerhossain/common";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { sampleOrder, sampleTicket } from "../constants/sample-test-data";
import { OrderCancelledListener } from "../events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "../events/listeners/order-created-listener";
import { OrderDocInterface } from "../interface/OrderDocInterface";
import { natsWrapper } from "../middlewares/nats-wrapper";
import { createOrder } from "../transactions/order.transaction";

export const orderCreatedHelperPreTestSetup = async (): Promise<{
  listener: OrderCreatedListener,
  data: OrderCreatedEvent['data'],
  msg: Message
}> => {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);


  // create a fake data event
  const data: OrderCreatedEvent['data'] = {
    ...sampleOrder,
    expiresAt: sampleOrder.expiresAt.toString(),
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {
    listener,
    data,
    msg
  };
};

export const orderCancelledHelperPreTestSetup = async (): Promise<{
  listener: OrderCancelledListener,
  data: OrderCancelledEvent['data'],
  order: OrderDocInterface,
  msg: Message
}> => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = await createOrder({
    id: sampleOrder.id,
    version: sampleOrder.version,
    userId: sampleOrder.userId,
    status: sampleOrder.status,
    price: sampleOrder.ticket.price
  });

  if (!order) throw new BadRequest('Order creation failed');


  // create a fake data event
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: order.version + 1,
    ticket: {
      id: 'anything'
    }
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {
    listener,
    data,
    order,
    msg
  };
};