import { TicketAttributesInterface } from "./TicketAttributesInterface";
import { Event } from "./event";
import { Subjects } from "../enums/subjects";

export interface TicketCreatedEvent extends Event {
  subject: Subjects.TicketCreated;
  data: TicketAttributesInterface;
};