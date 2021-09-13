import { randomBytes } from "crypto";
import { connect } from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";

export const stan = connect(
  'ticketing',
  `NATS-Client-Listener${randomBytes(4).toString('hex')}`,
  {
    url: 'http://localhost:4222'
  });

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  new TicketCreatedListener(stan).listen();


});

stan.on('close', () => {
  console.log('Listener unsubscribed from ticket:created channel');
  process.exit();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

