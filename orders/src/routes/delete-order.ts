import { BadRequest, OrderStatus, UnAuthorized } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { natsWrapper } from "../middlewares/nats-wrapper";
import { getOrderByIdAndUser } from "../transactions/order.transaction";

export const deleteOrderRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let order = await getOrderByIdAndUser(req.params.orderId, req.currentUserInfo?.id || '');

  if (!order) throw new BadRequest('Order not found');

  order.status = OrderStatus.Cancelled;
  await order.save();

  if (!order) throw new BadRequest('Order Cancelled failed');

  // await new TicketUpdatedPublisher(natsWrapper.client)
  //   .publish({
  //     id: order.id,
  //     title: order.title,
  //     userId: order.userId,
  //     price: order.price
  //   });

  res.sendStatus(204);
};