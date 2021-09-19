import { TicketCreatedEvent, TicketUpdatedEvent } from "@tanweerhossain/common";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";
import { sampleTicket } from "../constants/sample-test-data";
import { TicketCreatedListener } from "../events/listeners/ticket-created-listenter";
import { TicketUpdatedListener } from "../events/listeners/ticket-updated-listener";
import { TicketDocInterface } from "../interface/TicketDoc";
import { natsWrapper } from "../middlewares/nats-wrapper";
import { saveTicket } from "../transactions/ticket.transaction";

export const ticketCreatedHelperPreTestSetup = (): {
  listener: TicketCreatedListener,
  data: TicketCreatedEvent['data'],
  msg: Message
} => {
  // create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: TicketCreatedEvent['data'] = {
    version: 0,
    id: new Types.ObjectId().toHexString(),
    ...sampleTicket,
    userId: new Types.ObjectId().toHexString()
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

export const ticketUpdatedHelperPreTestSetup = async (): Promise<{
  listener: TicketUpdatedListener,
  ticket: TicketDocInterface,
  data: TicketUpdatedEvent['data'],
  msg: Message
}> => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = await saveTicket({
    id: new Types.ObjectId().toHexString(),
    ...sampleTicket
  });

  if (!ticket) throw new Error("save ticket failed");


  // create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    version: ticket?.version + 1,
    id: ticket.id,
    ...sampleTicket,
    userId: new Types.ObjectId().toHexString()
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