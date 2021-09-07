import { buildClient } from "../api/build-client";

const App = ({ currentUser }) =>
  currentUser
    ? (<h4>You are Signed In as {currentUser?.email || 'N/A'}</h4>)
    : (<h4>You are not Signed In</h4>);

App.getInitialProps = async (context) => {
  const { data } = await buildClient(context)
    .get('/api/users/currentuser');
  return data
};

export default App;