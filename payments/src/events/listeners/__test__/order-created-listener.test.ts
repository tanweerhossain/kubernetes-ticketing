import { BadRequest } from "@tanweerhossain/common";
import { orderCreatedHelperPreTestSetup } from "../../../test/listener-helper";
import { getOrderById } from "../../../transactions/order.transaction";

it('replicates the order info', async () => {
  const { listener, data, msg } = await orderCreatedHelperPreTestSetup();

  await listener.onMessage(data, msg);

  const order = await getOrderById(data.id);

  if (!order) throw new BadRequest("Order not found");

  expect(order.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await orderCreatedHelperPreTestSetup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});