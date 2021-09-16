import { OrderCreatedEvent, Publisher, Subjects } from "@tanweerhossain/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  public readonly subject = Subjects.OrderCreated;
};