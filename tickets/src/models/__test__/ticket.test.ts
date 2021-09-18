import { sampleTicket } from "../../constants/sample-test-data";
import { Ticket } from "../ticket";

it('implements optimistic concurrency control', async () => {
  // Create  an instance of a ticket
  const ticket = Ticket.build({
    ...sampleTicket,
    userId: 'anything'
  })

  // Save the ticket
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Make two separate changes to the tickets we fetched
  firstInstance?.set({ price: 15 });
  secondInstance?.set({ price: 20 });

  // Save the first fetched ticket
  await firstInstance?.save();

  // Save the second fetched ticket and expect an version error
  try {
    await secondInstance?.save();
  } catch (error: any) {
    expect(error.name).toEqual('VersionError');
    return Promise.resolve(1);
  }
  throw new Error("Does not throw version error");

});

it('increments the version number on multiple updates', async () => {
  const ticket = Ticket.build({
    ...sampleTicket,
    userId: 'anything'
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);

  await ticket.save();
  expect(ticket.version).toEqual(3);

});