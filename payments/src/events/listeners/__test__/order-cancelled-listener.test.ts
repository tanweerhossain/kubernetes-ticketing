import { BadRequest, OrderStatus } from "@tanweerhossain/common";
import { orderCancelledHelperPreTestSetup } from "../../../test/listener-helper";
import { getOrderById } from "../../../transactions/order.transaction";

it('Cancels the order info', async () => {
  const { listener, data, msg, order } = await orderCancelledHelperPreTestSetup();

  await listener.onMessage(data, msg);

  const updatedOrder = await getOrderById(data.id);

  if (!updatedOrder) throw new BadRequest("Order not found");

  expect(updatedOrder.status).toEqual(OrderStatus.Cancelled);
});

it('acks the message', async () => {
  const { listener, data, msg, order } = await orderCancelledHelperPreTestSetup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});