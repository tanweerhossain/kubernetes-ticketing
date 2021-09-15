import { BadRequest } from "@tanweerhossain/common";
import { NextFunction, Request, Response } from "express";
import { fetchOrders } from "../transactions/order.transaction";

export const fetchOrdersRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = req.currentUserInfo?.id || '';

  const orders = await fetchOrders(userId);

  if (!orders) throw new BadRequest('Failed to fetch orders');

  res
    .status(200)
    .json(orders);
};