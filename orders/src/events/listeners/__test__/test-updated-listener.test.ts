import { ticketCreatedHelperPreTestSetup, ticketUpdatedHelperPreTestSetup } from "../../../test/listener-helper";
import { findTicketById } from "../../../transactions/ticket.transaction";

it('finds, update and save a ticket', async () => {
  const { listener, data, msg, ticket } = await ticketUpdatedHelperPreTestSetup();

  // call the onMessage function wuth th data object + message object
  await listener.onMessage(data, msg);

  // write an assertion to make sure a ticket was created
  const updatedTicket = await findTicketById(ticket.id);

  expect(updatedTicket?.id).toEqual(data.id);
  expect(updatedTicket?.price).toEqual(data.price);
  expect(updatedTicket?.title).toEqual(data.title);
  expect(updatedTicket?.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { listener, data, msg } = await ticketUpdatedHelperPreTestSetup();

  // call the onMessage function wuth th data object + message object
  await listener.onMessage(data, msg);

  // write an assertion to make ack function is called
  expect(msg.ack).toHaveBeenCalled();

});

it('does not call acks the message if event has a skipped version number', async () => {
  const { listener, data, msg, ticket } = await ticketUpdatedHelperPreTestSetup();

  data.version = 10;

  // call the onMessage function wuth th data object + message object
  try {
    await listener.onMessage(data, msg);
  } catch (error) { }

  // write an assertion to make ack function is called
  expect(msg.ack).not.toHaveBeenCalled();

});