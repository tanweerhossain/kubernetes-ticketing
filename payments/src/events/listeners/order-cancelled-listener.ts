import { Listener, Subjects, BadRequest, OrderCancelledEvent, OrderStatus } from "@tanweerhossain/common";
import { Message } from "node-nats-streaming";
import { nconf } from "../../conf";
import { getOrderById } from "../../transactions/order.transaction";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  public readonly subject = Subjects.OrderCancelled;
  public queueGroupName = nconf.get('QUEUE-GROUP-NAME');

  public async onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {
    const { id: orderId, version } = data;

    const order = await getOrderById(orderId, version - 1);

    if (!order) throw new BadRequest("Order is missing");

    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    // Only called on successful process
    msg.ack();
  }
}