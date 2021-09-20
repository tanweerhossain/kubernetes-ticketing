import { getJWT, OrderStatus } from "@tanweerhossain/common";
import { Types } from "mongoose";
import { nconf } from "../conf";

export const sampleCookie: string =
  `express:sess=${Buffer
    .from(
      JSON.stringify({
        jwt: getJWT({
          id: new Types.ObjectId().toHexString(),
          email: 'email1@domain.com'
        })
      })
    )
    .toString('base64')}`;

export const sampleCookie2: string =
  `express:sess=${Buffer
    .from(
      JSON.stringify({
        jwt: getJWT({
          id: new Types.ObjectId().toHexString(),
          email: 'email2@domain.com'
        })
      })
    )
    .toString('base64')}`;

export const sampleTicket = {
  title: 'Item1',
  price: 10
};

export const sampleOrder = {
  status: OrderStatus.Created,
  userId: new Types.ObjectId().toHexString(),
  expiresAt: new Date(Date.now() + nconf.get('ORDER-EXPIRATION-DURATION-MILLI-SEC')),
  ticket: {
    id: new Types.ObjectId().toHexString(),
    price: 10
  }
};

export const sampleTicket2 = {
  title: 'Item2',
  price: 20
};