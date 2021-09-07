import { useState } from "react";
import Router from "next/router";

import { nconf } from "../../conf";
import { userRequest } from "../../hooks/use-request.hooks";


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = userRequest({
    url: `${nconf.get('API-SERVICE-HOST')}/api/users/signin`,
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Addresss</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control" />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signin;