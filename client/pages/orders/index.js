import Link from "next/link";

const Orders = ({ currentUser, orders }) =>
  currentUser
    ? (<div>
      <h1>Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>{order.ticket.price}</td>
                <td>{order.status.toUpperCase()}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>)
    : (<h4>You are not Signed In</h4>);

Orders.getInitialProps = async (context, client, currentUser) => {
  let orders = [];
  try {
    ({ data: orders } = await client.get('/api/orders'));
  } catch (error) {
    console.error('===>', error.response.data);
  }
  return { orders };
};

export default Orders;