import { BadRequest, ExpirationCompleteEvent, Listener, OrderStatus, Subjects } from "@tanweerhossain/common";
import { Message } from "node-nats-streaming";
import { nconf } from "../../conf";
import { OrderDocumentInterface } from "../../interface/OrderDocument";
import { getOrderById } from "../../transactions/order.transaction";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
  queueGroupName = nconf.get('QUEUE-GROUP-NAME');

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const { orderId } = data;

    const order: OrderDocumentInterface | null = await getOrderById(orderId);

    if (!order) throw new BadRequest('Order not found');

    if (order.status === OrderStatus.Completed) return msg.ack();

    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    await new OrderCancelledPublisher(this.client)
      .publish({
        id: order.id,
        version: order.version,
        ticket: {
          id: order.ticket.id
        }
      });


    // Only called on successful process
    msg.ack();
  }
};