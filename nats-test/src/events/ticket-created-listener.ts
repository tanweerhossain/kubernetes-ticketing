import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  public readonly subject = Subjects.TicketCreated;
  public queueGroupName = 'payments-service';

  public onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data:', data);

    msg.ack();
  }
}