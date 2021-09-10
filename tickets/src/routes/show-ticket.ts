import { BadRequest } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { TicketAttributesInterface } from "../interface/TicketAttributes";
import { getTicket, saveTicket } from "../transactions/ticket.transaction";

export const showTicketRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ticketId: string = req.params.ticketId;

  const ticket = await getTicket(ticketId);

  if (!ticket) throw new BadRequest('Failed to fetch ticket');

  res
    .status(200)
    .json(ticket);
};