import { BadRequest } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { TicketAttributesInterface } from "@tanweerhossain/common";
import { saveTicket } from "../transactions/ticket.transaction";

export const saveTicketRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    title,
    price
  } = req.body as TicketAttributesInterface;

  const ticket = await saveTicket({
    title,
    price,
    userId: req.currentUserInfo!.id || ''
  });

  if (!ticket) throw new BadRequest('Failed to save ticket');

  res
    .status(201)
    .json(ticket);
};