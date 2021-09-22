import { PaymentCreatedEvent, Publisher, Subjects } from "@tanweerhossain/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
};