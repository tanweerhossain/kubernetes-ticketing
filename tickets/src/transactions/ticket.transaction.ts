import { LeanDocument } from "mongoose";
import { DatabaseConnectionError } from "@tanweerhossain/common";

import { TicketAttributesInterface } from "@tanweerhossain/common";
import { TicketDocInterface } from "../interface/TicketDoc";
import { Ticket } from "../models/ticket";

export const saveTicket = async (
  ticketObject: TicketAttributesInterface):
  Promise<LeanDocument<TicketDocInterface> |
    null> => {
  try {
    let result: TicketDocInterface = Ticket.build(ticketObject);

    result = await result.save();

    if (!!result) {
      return result.toJSON();
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to save ticket');
  }
};

export const getTicket = async (
  ticketId: string):
  Promise<LeanDocument<TicketDocInterface> |
    null> => {
  try {
    let result:
      TicketDocInterface |
      null = await Ticket.findById(ticketId);

    if (!!result) {
      return result.toJSON();
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch ticket');
  }
};

export const fetchTickets = async (
  userId: string):
  Promise<LeanDocument<TicketDocInterface[]> |
    null> => {
  try {
    let result:
      TicketDocInterface[] = await Ticket.find({ userId });

    if (!!result) {
      return result
        .map(e => e.toJSON());
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch tickets');
  }
};

export const updateTicket = async (
  ticketId: string,
  ticketAttributes: TicketAttributesInterface):
  Promise<LeanDocument<TicketDocInterface> |
    null> => {
  try {
    let result:
      TicketDocInterface |
      null = await Ticket.findOneAndUpdate({ _id: ticketId }, {
        $set: ticketAttributes
      }, {
        new: true,
        upsert: false
      });

    if (!!result) {
      return result.toJSON();
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to update ticket');
  }
};