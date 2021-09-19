import { natsWrapper } from "../../middlewares/nats-wrapper";
import { OrderCancelledListener } from "./order-cancelled-listener";
import { OrderCreatedListener } from "./order-created-listener";

export const eventListners = (): void => {
  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderCancelledListener(natsWrapper.client).listen();
};