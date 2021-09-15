import { BadRequest, NotFoundError, OrderStatus } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { findTicketById } from "../transactions/ticket.transaction";
import { createOrder, IsTicketReserved } from "../transactions/order.transaction";
import { nconf } from "../conf";

export const saveOrderRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ticketId: string = req.body.ticketId;

  const ticket = await findTicketById(ticketId);

  if (!ticket) throw new NotFoundError();

  const IsExistingOrder = await IsTicketReserved(ticket);

  if (IsExistingOrder) throw new BadRequest("Ticket is already reserved");

  const expiration = new Date(
    Date.now() +
    nconf.get('ORDER-EXPIRATION-DURATION-MILLI-SEC'));

  const order = await createOrder({
    userId: req.currentUserInfo!.id || '',
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket
  });

  if (!order) throw new BadRequest("Failed to create order");


  // await new TicketCreatedPublisher(natsWrapper.client)
  //   .publish({
  //     id: ticket.id,
  //     title: ticket.title,
  //     userId: ticket.userId,
  //     price: ticket.price
  //   });

  res
    .status(201)
    .json(order);
};