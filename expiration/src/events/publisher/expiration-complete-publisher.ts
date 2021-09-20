import { ExpirationCompleteEvent, Publisher, Subjects } from "@tanweerhossain/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  public readonly subject = Subjects.ExpirationComplete;
};