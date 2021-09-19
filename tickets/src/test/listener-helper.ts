import { BadRequest, OrderCancelledEvent, OrderCreatedEvent, OrderStatus } from "@tanweerhossain/common";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { sampleTicket } from "../constants/sample-test-data";
import { OrderCancelledListener } from "../events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "../events/listeners/order-created-listener";
import { TicketDocInterface } from "../interface/TicketDoc";
import { natsWrapper } from "../middlewares/nats-wrapper";
import { Ticket } from "../models/ticket";
import { saveTicket } from "../transactions/ticket.transaction";

export const orderCreatedHelperPreTestSetup = async (): Promise<{
  listener: OrderCreatedListener,
  ticket: TicketDocInterface,
  data: OrderCreatedEvent['data'],
  msg: Message
}> => {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create and save ticket
  const ticket = await saveTicket({
    ...sampleTicket,
    userId: new Types.ObjectId().toHexString()
  });

  if (!ticket) throw new BadRequest("Failed to save ticket");


  // create a fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new Types.ObjectId().toHexString(),
    userId: new Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    expiresAt: 'anything',
    version: 0,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    }
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {
    listener,
    ticket,
    data,
    msg
  };
};

export const orderCancelledHelperPreTestSetup = async (): Promise<{
  listener: OrderCancelledListener,
  ticket: TicketDocInterface,
  orderId: string,
  data: OrderCancelledEvent['data'],
  msg: Message
}> => {
  const orderId: string = new Types.ObjectId().toHexString();

  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // create and save ticket
  const ticket = Ticket.build({
    ...sampleTicket,
    userId: new Types.ObjectId().toHexString()
  });
  ticket.set({ orderId });
  await ticket.save();

  if (!ticket) throw new BadRequest("Failed to save ticket");

  // create a fake data event
  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id
    }
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {
    listener,
    orderId,
    ticket,
    data,
    msg
  };
};
