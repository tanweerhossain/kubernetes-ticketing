import { Event } from "../interface/event";
import { Subjects } from "../enums/subjects";

export interface TicketUpdatedEvent extends Event {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
    version: number;
  };
};