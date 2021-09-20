import { Subjects } from "../enums/subjects";

export interface ExpirationComplete {
  subject: Subjects.ExpirationComplete;
  data: {
    orderId: string;
  };
};