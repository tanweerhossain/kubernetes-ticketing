import { BadRequest, UnAuthorized } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { getTicket, updateTicket } from "../transactions/ticket.transaction";

export const updateTicketRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let ticket = await getTicket(req.params.ticketId);

  if (!ticket) throw new BadRequest('Ticket was not found');

  if (ticket.userId !== req.currentUserInfo?.id) throw new UnAuthorized();

  ticket = await updateTicket(ticket.id, req.body);

  if (!ticket) throw new BadRequest('Ticket updation failed');

  res
    .status(200)
    .json(ticket);
};