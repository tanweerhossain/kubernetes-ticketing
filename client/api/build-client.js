import axios from "axios";
import { nconf } from "../conf";

export const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // Execute in server
    return axios.create({
      baseURL: nconf.get('INGRESS-LOAD-BALANCER-HOST'),
      headers: req.headers
    });
  } else {
    // Execute in client machine
    return axios.create({
      baseURL: nconf.get('API-SERVICE-HOST')
    });
  }
};