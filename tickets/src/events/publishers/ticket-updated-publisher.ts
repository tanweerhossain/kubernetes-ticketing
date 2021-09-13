import { Publisher, Subjects, TicketUpdatedEvent } from "@tanweerhossain/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}