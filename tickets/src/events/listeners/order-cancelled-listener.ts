import { Listener, Subjects, BadRequest, OrderCancelledEvent } from "@tanweerhossain/common";
import { Message } from "node-nats-streaming";
import { nconf } from "../../conf";
import { getTicket } from "../../transactions/ticket.transaction";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  public readonly subject = Subjects.OrderCancelled;
  public queueGroupName = nconf.get('QUEUE-GROUP-NAME');

  public async onMessage(data: OrderCancelledEvent['data'], msg: Message): Promise<void> {
    const { ticket: { id: ticketId }, id: orderId } = data;

    const ticket = await getTicket(ticketId);

    if (!ticket) throw new BadRequest("Ticket is missing");

    ticket.set({ orderId: undefined });

    await ticket.save();

    await new TicketUpdatedPublisher(this.client)
      .publish({
        id: ticket.id,
        title: ticket.title,
        userId: ticket.userId,
        price: ticket.price,
        orderId: ticket.orderId,
        version: ticket.version
      });

    // Only called on successful process
    msg.ack();
  }
}