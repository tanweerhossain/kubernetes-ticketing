import { BadRequest, OrderStatus, UnAuthorized } from "@tanweerhossain/common";
import { Request, Response } from "express";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../middlewares/nats-wrapper";
import { stripe } from "../services/stripe";
import { getOrderById } from "../transactions/order.transaction";
import { savePayment } from "../transactions/payment.transaction";

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

  let paymentResponse;
  try {
    paymentResponse = await stripe.charges.create({
      currency: 'INR',
      amount: order.price * 100,
      source: token
    });
  } catch (error: any) {
    throw new BadRequest(error.message);
  }
  if (!paymentResponse) throw new BadRequest('Failed from Payment Service');

  const payment = await savePayment({
    orderId: order.id,
    stripeId: paymentResponse.id
  });

  if (!payment) throw new BadRequest('Payment saving failed');


  await new PaymentCreatedPublisher(natsWrapper.client)
    .publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId
    });

  res.status(201).json({
    id: payment.id
  });
};