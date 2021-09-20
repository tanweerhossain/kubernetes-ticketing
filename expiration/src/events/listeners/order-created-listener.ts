import { Listener, OrderCreatedEvent, Subjects } from "@tanweerhossain/common";
import { Message } from "node-nats-streaming";
import { nconf } from "../../conf";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  public readonly subject = Subjects.OrderCreated;
  public queueGroupName = nconf.get('QUEUE-GROUP-NAME');

  public async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id: orderId, expiresAt } = data;
    let delay: number = parseInt(expiresAt) - Date.now();

    delay = delay >= 0 ? delay : 0;

    await expirationQueue.add({ orderId }, { delay });

    msg.ack();
  }
};