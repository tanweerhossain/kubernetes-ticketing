import { Publisher, Subjects, TicketCreatedEvent } from "@tanweerhossain/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}