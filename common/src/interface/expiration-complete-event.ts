import { Subjects } from "../enums/subjects";
import { Event } from "./event";

export interface ExpirationCompleteEvent extends Event {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
};