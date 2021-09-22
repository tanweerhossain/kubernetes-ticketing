import { BadRequest, Listener, OrderStatus, PaymentCreatedEvent, Subjects } from "@tanweerhossain/common";
import { Message } from "node-nats-streaming";
import { nconf } from "../../conf";
import { OrderDocumentInterface } from "../../interface/OrderDocument";
import { getOrderById } from "../../transactions/order.transaction";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  public readonly subject = Subjects.PaymentCreated;
  public queueGroupName = nconf.get('QUEUE-GROUP-NAME');

  public async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const { id, orderId, stripeId } = data;

    const order: OrderDocumentInterface | null = await getOrderById(orderId);

    if (!order) throw new BadRequest('Order not found');

    order.set({ status: OrderStatus.Completed });

    await order.save();

    msg.ack();
  }
}