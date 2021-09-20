import { BadRequest, OrderStatus, UnAuthorized } from "@tanweerhossain/common";
import { Request, Response } from "express";
import { getOrderById } from "../transactions/order.transaction";

export const verifyNSavePaymentRouter = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { orderId, token } = req.body;
  const { id: userId } = req.currentUserInfo!;

  if (!userId) throw new UnAuthorized();

  const order = await getOrderById(orderId);

  if (!order) throw new BadRequest('Order not found');
  if (order.userId !== userId) throw new UnAuthorized();
  if (order.status === OrderStatus.Cancelled) throw new BadRequest('Can\'t pay cancelled order');


  res.sendStatus(201);
};