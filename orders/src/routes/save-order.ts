import { BadRequest, NotFoundError, OrderStatus } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { findTicketById } from "../transactions/ticket.transaction";
import { createOrder, IsTicketReserved } from "../transactions/order.transaction";
import { nconf } from "../conf";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../middlewares/nats-wrapper";

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


  new OrderCreatedPublisher(natsWrapper.client)
    .publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.getTime().toString(),
      ticket: {
        id: ticket.id,
        price: ticket.price
      }
    });

  res
    .status(201)
    .json(order);
};