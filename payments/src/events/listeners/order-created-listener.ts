import { Listener, OrderCreatedEvent, Subjects } from "@tanweerhossain/common";
import { Message } from "node-nats-streaming";
import { nconf } from "../../conf";
import { createOrder } from "../../transactions/order.transaction";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  public queueGroupName = nconf.get('QUEUE-GROUP-NAME');

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = await createOrder({
      id: data.id,
      version: data.version,
      userId: data.userId,
      price: data.ticket.price,
      status: data.status,
    });

    msg.ack();
  }
}