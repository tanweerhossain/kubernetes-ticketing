import { useEffect } from "react";
import Router from "next/router";

import { nconf } from "../../conf";
import { userRequest } from "../../hooks/use-request.hooks";


const SignOut = () => {
  const { doRequest, errors } = userRequest({
    url: `${nconf.get('API-SERVICE-HOST')}/api/users/signout`,
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div>Signing you out...</div>
  );
};

export default SignOut;