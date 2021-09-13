import { TicketAttributesInterface } from "../interface/TicketAttributesInterface";
import { Event } from "./event";
import { Subjects } from "./subjects";

export interface TicketCreatedEvent extends Event {
  subject: Subjects.TicketCreated;
  data: TicketAttributesInterface;
};