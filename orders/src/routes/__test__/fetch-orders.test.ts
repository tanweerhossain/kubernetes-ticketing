import { Types } from "mongoose";
import request, { Response } from "supertest";
import { app } from "../../app";
import { sampleCookie, sampleCookie2, sampleTicket } from "../../constants/sample-test-data";
import { saveTicket } from "../../transactions/ticket.transaction";

const endpoint: string = '/api/orders';

it('Returns an error if the session doestn\'t exist', (done) => {
  request(app)
    .get(endpoint)
    .end((err: any, res: Response) => {
      expect(res.statusCode).toEqual(401);

      done();
    });
});

it('fetch orders for an particular user', async () => {
  // Create 3 tickets
  const ticketOne = await saveTicket(sampleTicket);
  const ticketTwo = await saveTicket(sampleTicket);
  const ticketThree = await saveTicket(sampleTicket);

  // Create One order as User #1
  await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({ ticketId: ticketOne?.id })
    .expect(201);

  // Create two orders as User #2
  const { body: orderOne } = await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie2)
    .send({ ticketId: ticketTwo?.id })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie2)
    .send({ ticketId: ticketThree?.id })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get(endpoint)
    .set('Cookie', sampleCookie2)
    .expect(200);

  // Make sure that we only got the orders for User #2
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body).toHaveLength(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);

  Promise.resolve(1);
})