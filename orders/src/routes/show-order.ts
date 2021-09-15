import { BadRequest } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { getOrderByIdAndUser } from "../transactions/order.transaction";

export const showOrderRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const orderId: string = req.params.orderId;

  const ticket = await getOrderByIdAndUser(orderId, req.currentUserInfo?.id || '');

  if (!ticket) throw new BadRequest('Failed to fetch order');

  res
    .status(200)
    .json(ticket);
};