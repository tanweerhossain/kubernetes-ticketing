import { OrderStatus, Subjects } from "@tanweerhossain/common";
import { natsWrapper } from "../../../middlewares/nats-wrapper";
import { expirationCompletedHelperPreTestSetup } from "../../../test/listener-helper";
import { getOrderById } from "../../../transactions/order.transaction";

it('creates and save a ticket', async () => {
  const { listener, data, msg, order } = await expirationCompletedHelperPreTestSetup();

  // call the onMessage function wuth th data object + message object
  await listener.onMessage(data, msg);

  // write an assertion to make sure a ticket was created
  const updatedOrder = await getOrderById(order.id);

  if (!updatedOrder) throw new Error("Order not found");

  expect(updatedOrder).toBeDefined();
  expect(updatedOrder.status).toEqual(OrderStatus.Cancelled);
  expect(updatedOrder.id).toEqual(data.orderId);
});

it('acks the message', async () => {
  const { listener, data, msg } = await expirationCompletedHelperPreTestSetup();

  // call the onMessage function wuth th data object + message object
  await listener.onMessage(data, msg);

  // write an assertion to make ack function is called
  expect(msg.ack).toHaveBeenCalled();

});

it('Emit an OrderCancelled Event', async () => {
  const { listener, data, msg, order } = await expirationCompletedHelperPreTestSetup();

  // call the onMessage function wuth th data object + message object
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const [[subject, rawData]] = (natsWrapper.client.publish as jest.Mock).mock.calls;

  expect(subject).toEqual(Subjects.OrderCancelled);

  const event = JSON.parse(rawData);

  expect(event.id).toEqual(order.id);

});