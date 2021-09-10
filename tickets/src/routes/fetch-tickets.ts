import { BadRequest } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { fetchTickets } from "../transactions/ticket.transaction";

export const fetchTicketsRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = req.currentUserInfo?.id || '';

  const tickets = await fetchTickets(userId);

  if (!tickets) throw new BadRequest('Failed to fetch tickets');

  res
    .status(200)
    .json(tickets);
};