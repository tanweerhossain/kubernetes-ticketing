import { TicketAttributesInterface } from "../interface/TicketAttributesInterface";
import { Event } from "./event";
import { Subjects } from "./subjects";

export interface TicketUpdatedEvent extends Event {
  subject: Subjects.TicketUpdated;
  data: TicketAttributesInterface;
};