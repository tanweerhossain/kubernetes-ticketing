import { BadRequest, OrderStatus } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "../middlewares/nats-wrapper";
import { getOrderByIdAndUser } from "../transactions/order.transaction";

export const deleteOrderRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let order = await getOrderByIdAndUser(req.params.orderId, req.currentUserInfo?.id || '');

  if (!order) throw new BadRequest('Order not found');

  const ticketId = order.ticket.id;
  order.status = OrderStatus.Cancelled;
  await order.save();

  if (!order) throw new BadRequest('Order Cancelled failed');

  new OrderCancelledPublisher(natsWrapper.client)
    .publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: ticketId
      }
    });

  res.sendStatus(204);
};