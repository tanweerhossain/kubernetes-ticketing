import Router from "next/router";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { nconf } from "../../conf";
import { userRequest } from "../../hooks/use-request.hooks";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = userRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: ({ id: paymentId }) => Router.push('/orders')
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const milliSecLeft = new Date(order.expiresAt).getTime() - Date.now();
      setTimeLeft(Math.round(milliSecLeft / 1000))
    }

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  const onToken = ({ id: token }) => {
    doRequest({ token });
  };

  if (timeLeft < 0) Router.push(
    '/tickets/[ticketId]',
    `/tickets/${order.ticket.id}`
  );

  return (
    <div>
      <h1>{order.ticket.title}</h1>
      <h4>Time Left to Pay ₹{order.ticket.price}: {timeLeft} Sec</h4>
      <StripeCheckout
        name={order.ticket.title}
        description={`Time Left: ${timeLeft} Sec`}
        token={onToken}
        stripeKey={nconf.get('STRIPE-PUBLISHABLE-KEY')}
        amount={order.ticket.price * 100}
        email={currentUser.email}
        currency='INR'
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client, currentUser) => {
  const { orderId } = context.query;
  let order = {};
  try {
    ({ data: order } = await client.get(`/api/orders/${orderId}`));
  } catch (error) {
    console.error('===>', error.response.data);
  }

  return { order };
}

export default OrderShow;