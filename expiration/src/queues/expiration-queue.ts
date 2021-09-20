import { Subjects } from "@tanweerhossain/common";
import Queue from "bull";
import { Payload } from "../interface/Payload";

export const expirationQueue = new Queue<Payload>(Subjects.OrderExpiration, {
  redis: {
    host: process.env.REDIS_HOST
  }
});

expirationQueue.process(async job => {
  console.info('publish expiration:complete =>', job.data.orderId);
});