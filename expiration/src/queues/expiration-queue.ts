import { Subjects } from "@tanweerhossain/common";
import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/publisher/expiration-complete-publisher";
import { Payload } from "../interface/Payload";
import { natsWrapper } from "../middlewares/nats-wrapper";

export const expirationQueue = new Queue<Payload>(Subjects.OrderExpiration, {
  redis: {
    host: process.env.REDIS_HOST
  }
});

expirationQueue.process(async job => {
  new ExpirationCompletePublisher(natsWrapper.client)
    .publish({
      orderId: job.data.orderId
    });
});