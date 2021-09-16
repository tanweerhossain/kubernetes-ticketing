import { natsWrapper } from "../../middlewares/nats-wrapper";
import { TicketCreatedListener } from "./ticket-created-listenter";
import { TicketUpdatedListener } from "./ticket-updated-listener";

export const eventListners = (): void => {
  new TicketCreatedListener(natsWrapper.client).listen();
  new TicketUpdatedListener(natsWrapper.client).listen();
};