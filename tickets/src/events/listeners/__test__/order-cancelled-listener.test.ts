import { BadRequest, Subjects } from "@tanweerhossain/common";
import { natsWrapper } from "../../../middlewares/nats-wrapper"
import { orderCancelledHelperPreTestSetup } from "../../../test/listener-helper";
import { getTicket } from "../../../transactions/ticket.transaction";

it('UnSets the orderId of the ticket', async () => {
  const { listener, ticket, data, msg, orderId } = await orderCancelledHelperPreTestSetup();

  await listener.onMessage(data, msg);

  const updatedTicket = await getTicket(ticket.id);

  if (!updatedTicket) throw new BadRequest("Ticket not found");

  expect(updatedTicket.orderId).toBeUndefined();
});

it('acks the message', async () => {
  const { listener, data, msg } = await orderCancelledHelperPreTestSetup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('Publishes a ticket updated event', async () => {
  const { listener, data, msg } = await orderCancelledHelperPreTestSetup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const [[subject, rawData]] = (natsWrapper.client.publish as jest.Mock).mock.calls;

  expect(subject).toEqual(Subjects.TicketUpdated);

  const ticketUpdatedData = JSON.parse(rawData);

  expect(ticketUpdatedData.orderId).toBeUndefined();
});