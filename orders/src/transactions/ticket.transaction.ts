import { DatabaseConnectionError } from "@tanweerhossain/common";
import { LeanDocument } from "mongoose";
import { TicketAttributesInterface } from "../interface/TicketAttributes";
import { TicketDocInterface } from "../interface/TicketDoc";
import { Ticket } from "../models/ticket";

export const findTicketById = async (ticketId: string):
  Promise<TicketDocInterface |
    null> => {
  try {
    let result:
      TicketDocInterface |
      null = await Ticket.findById(ticketId);

    if (!!result) {
      return result;
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to fetch ticket');
  }
};

export const saveTicket = async (
  ticketObject: TicketAttributesInterface):
  Promise<TicketDocInterface |
    null> => {
  try {
    let result: TicketDocInterface = Ticket.build(ticketObject);

    result = await result.save();

    if (!!result) {
      return result;
    }

    return null;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to save ticket');
  }
};