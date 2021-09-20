import { natsWrapper } from "../../middlewares/nats-wrapper";
import { OrderCreatedListener } from "./order-created-listener";

export const eventListners = (): void => {
  new OrderCreatedListener(natsWrapper.client).listen();
};