import { OrderStatus } from "@tanweerhossain/common";
import { Types } from "mongoose";
import request, { Response } from "supertest";
import { app } from "../../app";
import { sampleCookie, sampleTicket } from "../../constants/sample-test-data";
import { natsWrapper } from "../../middlewares/nats-wrapper";
import { createOrder } from "../../transactions/order.transaction";
import { saveTicket } from "../../transactions/ticket.transaction";

const endpoint: string = '/api/orders';

it('Returns an error if the ticket doestn\'t exist', (done) => {
  const ticketId = new Types.ObjectId().toHexString();

  request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({ ticketId })
    .end((err: any, res: Response) => {
      expect(res.statusCode).toEqual(404);

      done();
    });

});

it('Returns an error if the ticket already reserved', async () => {
  const ticket = await saveTicket({ ...sampleTicket, id: new Types.ObjectId().toHexString() });

  if (!ticket) throw new Error('saveTicket failed');

  await createOrder({
    ticket,
    status: OrderStatus.Created,
    userId: new Types.ObjectId().toHexString(),
    expiresAt: new Date()
  });

  await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({ ticketId: ticket.id })
    .expect(400);

  Promise.resolve(1);
});

it('reserves a ticket', async () => {
  const ticket = await saveTicket({ ...sampleTicket, id: new Types.ObjectId().toHexString() });

  if (!ticket) throw new Error('saveTicket failed');

  await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({ ticketId: ticket._id })
    .expect(201);

  Promise.resolve(1);
});

it('Emits an order created event', async () => {
  const ticket = await saveTicket({ ...sampleTicket, id: new Types.ObjectId().toHexString() });

  if (!ticket) throw new Error('saveTicket failed');

  await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({ ticketId: ticket._id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

});