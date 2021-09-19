import { BadRequest, UnAuthorized } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../middlewares/nats-wrapper";
import { getTicket, updateTicket } from "../transactions/ticket.transaction";

export const updateTicketRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let ticket = await getTicket(req.params.ticketId);

  if (!ticket) throw new BadRequest('Ticket was not found');

  if (ticket.userId !== req.currentUserInfo?.id) throw new UnAuthorized();

  if (ticket.orderId) throw new BadRequest("Can\'t edit a reserved ticket");

  ticket = await updateTicket(ticket.id, req.body);

  if (!ticket) throw new BadRequest('Ticket updation failed');

  new TicketUpdatedPublisher(natsWrapper.client)
    .publish({
      id: ticket.id,
      title: ticket.title,
      userId: ticket.userId,
      price: ticket.price,
      version: ticket.version
    });

  res
    .status(200)
    .json(ticket);
};