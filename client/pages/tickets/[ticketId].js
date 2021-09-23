import Router from 'next/router'
import { userRequest } from "../../hooks/use-request.hooks";

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = userRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id
    },
    onSuccess: (order) => Router.push(
      '/orders/[orderId]',
      `/orders/${order.id}`
    )
  });
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: ₹{ticket.price}</h4>
      <button onClick={() => doRequest()} className="btn btn-primary">Purchase</button>
      {errors}
    </div>
  );
};

TicketShow.getInitialProps = async (context, client, currentUser) => {
  const { ticketId } = context.query;
  let ticket = {};
  try {
    ({ data: ticket } = await client.get(`/api/tickets/${ticketId}`));
  } catch (error) {
    console.error('===>', error.response.data);
  }

  return { ticket };
}

export default TicketShow;