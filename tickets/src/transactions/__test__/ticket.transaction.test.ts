import { Types } from "mongoose";
import { sampleTicket } from "../../constants/sample-test-data";
import { saveTicket, updateTicket } from "../ticket.transaction";


it('transaction: [ updateTicket ] increments the version number on multiple updates', async () => {
  let ticket = await saveTicket({
    ...sampleTicket,
    userId: new Types.ObjectId().toHexString()
  });


  expect(ticket?.version).toEqual(0);

  ticket = await updateTicket(ticket?.id, {
    ...sampleTicket,
    userId: ticket!.userId
  });

  expect(ticket?.version).toEqual(1);

  ticket = await updateTicket(ticket?.id, {
    ...sampleTicket,
    userId: ticket!.userId
  });

  expect(ticket?.version).toEqual(2);

});