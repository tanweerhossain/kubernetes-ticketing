import { BadRequest } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { TicketAttributesInterface } from "@tanweerhossain/common";
import { saveTicket } from "../transactions/ticket.transaction";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../middlewares/nats-wrapper";

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

  await new TicketCreatedPublisher(natsWrapper.client)
    .publish({
      id: ticket.id,
      title: ticket.title,
      userId: ticket.userId,
      price: ticket.price
    });

  res
    .status(201)
    .json(ticket);
};