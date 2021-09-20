import { BadRequest, OrderStatus } from "@tanweerhossain/common";
import { Types } from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { sampleCookie, sampleCookie2, sampleOrder } from "../../constants/sample-test-data";
import { createOrder } from "../../transactions/order.transaction";
const endpoint: string = '/api/payments';
it('Returns 401 if not authorized', async () => {
  await request(app)
    .post(endpoint)
    .send({})
    .expect(401);
});

it('Returns 400 if order is missing', async () => {
  await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({
      token: 'anything',
      orderId: sampleOrder.id
    })
    .expect(400);
  await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({})
    .expect(400);
});

it('Returns 401 if order is reserved by other user', async () => {
  const order = await createOrder({
    id: sampleOrder.id,
    status: sampleOrder.status,
    version: sampleOrder.version,
    userId: sampleOrder.userId,
    price: sampleOrder.ticket.price
  });

  if (!order) throw new BadRequest('Order creation failed');

  await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send({
      token: 'anything',
      orderId: order.id
    })
    .expect(401);
});

it('Returns 400 if order got cancelled', async () => {
  const order = await createOrder({
    id: sampleOrder.id,
    status: OrderStatus.Cancelled,
    version: sampleOrder.version,
    userId: sampleOrder.userId,
    price: sampleOrder.ticket.price
  });

  if (!order) throw new BadRequest('Order creation failed');

  const { body } = await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie2(order.userId))
    .send({
      token: 'anything',
      orderId: order.id
    })
    .expect(400);
  expect(body).toHaveProperty('errors');
  expect(Array.isArray(body.errors)).toBeTruthy();
  expect(body.errors).toHaveLength(1);
  expect(body.errors[0]).toHaveProperty('message');
  expect(body.errors[0].message).toEqual('Can\'t pay cancelled order');
});