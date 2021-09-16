import { BadRequest, Listener, Subjects, TicketCreatedEvent } from "@tanweerhossain/common";
import { Message } from "node-nats-streaming";
import { nconf } from "../../conf";
import { saveTicket } from "../../transactions/ticket.transaction";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  public readonly subject = Subjects.TicketCreated;
  public queueGroupName = nconf.get('QUEUE-GROUP-NAME');

  public async onMessage(data: TicketCreatedEvent['data'], msg: Message): Promise<void> {
    const { title, price, id } = data;

    if (!id) throw new BadRequest("Ticket is missing");

    await saveTicket({ id, title, price });

    // Only called on successful process
    msg.ack();
  }
}