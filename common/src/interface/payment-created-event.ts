import { Subjects } from "../enums/subjects";
import { Event } from "./event";

export interface PaymentCreatedEvent extends Event {
  subject: Subjects.PaymentCreated,
  data: {
    id: string,
    orderId: string;
    stripeId: string;
  };
};