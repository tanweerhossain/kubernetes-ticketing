import { TicketAttributesInterface } from "../interface/TicketAttributesInterface";
import { Event } from "../interface/event";
import { Subjects } from "../enums/subjects";

export interface TicketUpdatedEvent extends Event {
  subject: Subjects.TicketUpdated;
  data: TicketAttributesInterface;
};