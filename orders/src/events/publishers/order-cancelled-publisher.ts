import { OrderCancelledEvent, Publisher, Subjects } from "@tanweerhossain/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  public readonly subject = Subjects.OrderCancelled;
};