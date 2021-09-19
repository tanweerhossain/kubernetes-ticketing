import { BadRequest, DatabaseConnectionError } from "@tanweerhossain/common";
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
    let result: TicketDocInterface = await Ticket.build(ticketObject);

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

export const updateTicket = async (
  ticketId: string,
  ticketAttributes: TicketAttributesInterface,
  version: number | undefined = undefined):
  Promise<TicketDocInterface |
    null> => {
  try {
    let result: TicketDocInterface | null;

    result = (typeof version === 'number' && version)
      ? await Ticket.findByEvent({ id: ticketId, version })
      : await Ticket.findOne({ _id: ticketId });

    if (!result) throw new BadRequest("Ticket not found");

    result.title = ticketAttributes.title || result.title;
    result.price = ticketAttributes.price || result.price;

    await result.save();

    return result;
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError('Failed to update ticket');
  }
};