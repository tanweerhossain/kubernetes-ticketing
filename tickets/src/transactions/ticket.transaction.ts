import { LeanDocument } from "mongoose";
import { DatabaseConnectionError } from "@tanweerhossain/common";

import { TicketAttributesInterface } from "@tanweerhossain/common";
import { TicketDocInterface } from "../interface/TicketDoc";
import { Ticket } from "../models/ticket";

export const saveTicket = async (
  ticketObject: TicketAttributesInterface):
  Promise<TicketDocInterface | null> => {
  try {
    let result: TicketDocInterface = Ticket.build(ticketObject);

    result = await result.save();

    if (!!result) return result;

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to save ticket');
  }
};

export const getTicket = async (
  ticketId: string):
  Promise<TicketDocInterface |
    null> => {
  try {
    let result:
      TicketDocInterface |
      null = await Ticket.findById(ticketId);

    if (!!result) return result;

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch ticket');
  }
};

export const fetchTickets = async (
  userId: string):
  Promise<TicketDocInterface[] |
    null> => {
  try {
    let result:
      TicketDocInterface[] = await Ticket.find({ userId, orderId: undefined });

    if (!!result) return result;

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch tickets');
  }
};

export const updateTicket = async (
  ticketId: string,
  ticketAttributes: TicketAttributesInterface):
  Promise<TicketDocInterface | null> => {
  try {
    let result:
      TicketDocInterface |
      null = await Ticket.findOne({ _id: ticketId });

    if (!result) return null;

    result.title = ticketAttributes.title || result.title;
    result.price = ticketAttributes.price || result.price;

    await result.save();

    return result;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to update ticket');
  }
};