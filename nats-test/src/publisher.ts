import { connect } from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

export const stan = connect(
  'ticketing',
  'NATS-Client-Publisher',
  {
    url: 'http://localhost:4222'
  });

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');
  const data = {
    id: 'anything',
    title: 'anyTitle',
    price: 12
  };

  try {
    await (new TicketCreatedPublisher(stan))
      .publish(data);
  } catch (error) {
    console.error('Error while publishing: ', error);
  }
});
