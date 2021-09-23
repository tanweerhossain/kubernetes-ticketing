import Link from "next/link";

const App = ({ currentUser, tickets }) =>
  currentUser
    ? (<div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {
            tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                  <Link
                    href={"tickets/[ticketId]"}
                    as={`/tickets/${ticket.id}`}>
                    <a>View</a>
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>)
    : (<h4>You are not Signed In</h4>);

App.getInitialProps = async (context, client, currentUser) => {
  let tickets = [];
  try {
    ({ data: tickets } = await client.get('/api/tickets'));
  } catch (error) {
    console.error('===>', error.response.data);
  }
  return { tickets };
};

export default App;