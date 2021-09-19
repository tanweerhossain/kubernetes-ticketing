import { ticketCreatedHelperPreTestSetup } from "../../../test/listener-helper";
import { findTicketById } from "../../../transactions/ticket.transaction";

it('creates and save a ticket', async () => {
  const { listener, data, msg } = ticketCreatedHelperPreTestSetup();

  // call the onMessage function wuth th data object + message object
  await listener.onMessage(data, msg);

  // write an assertion to make sure a ticket was created
  const ticket = await findTicketById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket?.id).toEqual(data.id);
  expect(ticket?.price).toEqual(data.price);
  expect(ticket?.title).toEqual(data.title);
});

it('acks the message', async () => {
  const { listener, data, msg } = ticketCreatedHelperPreTestSetup();

  // call the onMessage function wuth th data object + message object
  await listener.onMessage(data, msg);

  // write an assertion to make ack function is called
  expect(msg.ack).toHaveBeenCalled();

});