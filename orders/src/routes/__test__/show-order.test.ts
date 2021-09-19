import { Types } from "mongoose";
import request, { Response } from "supertest";
import { app } from "../../app";
import { sampleCookie, sampleCookie2, sampleTicket } from "../../constants/sample-test-data";
import { saveTicket } from "../../transactions/ticket.transaction";

const endpoint: string = '/api/orders/:orderId';

it('Returns an error if the session doestn\'t exist', (done) => {
  request(app)
    .get(endpoint)
    .end((err: any, res: Response) => {
      expect(res.statusCode).toEqual(401);

      done();
    });
});

it('fetch the order', async () => {
  // Create a ticket
  const ticket = await saveTicket({ ...sampleTicket, id: new Types.ObjectId().toHexString() });

  // Create One order with the ticket
  const { body: order } = await request(app)
    .post(endpoint.replace(':orderId', ''))
    .set('Cookie', sampleCookie)
    .send({ ticketId: ticket?.id })
    .expect(201);

  // Make request to get order
  const response = await request(app)
    .get(endpoint.replace(':orderId', order.id))
    .set('Cookie', sampleCookie)
    .expect(200);

  // Make sure that we only got the order
  expect(typeof response.body).toEqual('object');
  expect(response.body).toHaveProperty('id');
  expect(response.body.id).toEqual(order.id);

  Promise.resolve(1);
});

it('return 400 if other user fetch the order', async () => {
  // Create a ticket
  const ticket = await saveTicket({ ...sampleTicket, id: new Types.ObjectId().toHexString() });

  // Create One order with the ticket
  const { body: order } = await request(app)
    .post(endpoint.replace(':orderId', ''))
    .set('Cookie', sampleCookie)
    .send({ ticketId: ticket?.id })
    .expect(201);

  // Make request to get order
  const response = await request(app)
    .get(endpoint.replace(':orderId', order.id))
    .set('Cookie', sampleCookie2)
    .expect(400);

  Promise.resolve(1);
});