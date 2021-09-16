import { OrderStatus } from "@tanweerhossain/common";
import { Types } from "mongoose";
import request, { Response } from "supertest";
import { app } from "../../app";
import { sampleCookie, sampleCookie2, sampleTicket } from "../../constants/sample-test-data";
import { natsWrapper } from "../../middlewares/nats-wrapper";
import { getOrderByIdAndUser } from "../../transactions/order.transaction";
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

it('mark an order as cancelled', async () => {
  // Create a ticket
  const ticket = await saveTicket(sampleTicket);

  // Create One order with the ticket
  const { body: order } = await request(app)
    .post(endpoint.replace(':orderId', ''))
    .set('Cookie', sampleCookie)
    .send({ ticketId: ticket?.id })
    .expect(201);

  // Make request to cancel order
  await request(app)
    .delete(endpoint.replace(':orderId', order.id))
    .set('Cookie', sampleCookie)
    .expect(204);

  // Ensure the order has been cancelled
  const result = await getOrderByIdAndUser(order.id, order.userId);

  expect(result?.status).toEqual(OrderStatus.Cancelled);

  Promise.resolve(1);
});


it('Emits an order cancelled event', async () => {
  // Create a ticket
  const ticket = await saveTicket(sampleTicket);

  // Create One order with the ticket
  const { body: order } = await request(app)
    .post(endpoint.replace(':orderId', ''))
    .set('Cookie', sampleCookie)
    .send({ ticketId: ticket?.id })
    .expect(201);

  // Make request to cancel order
  await request(app)
    .delete(endpoint.replace(':orderId', order.id))
    .set('Cookie', sampleCookie)
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});