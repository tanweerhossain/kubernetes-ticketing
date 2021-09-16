import { BadRequest, Listener, Subjects, TicketUpdatedEvent } from "@tanweerhossain/common";
import { Message } from "node-nats-streaming";
import { nconf } from "../../conf";
import { updateTicket } from "../../transactions/ticket.transaction";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  public readonly subject = Subjects.TicketUpdated;
  public queueGroupName = nconf.get('QUEUE-GROUP-NAME');

  public async onMessage(data: TicketUpdatedEvent['data'], msg: Message): Promise<void> {
    const { title, price, id } = data;

    if (!id) throw new BadRequest("Ticket is missing");

    await updateTicket(id, { id, title, price });

    // Only called on successful process
    msg.ack();
  }
}