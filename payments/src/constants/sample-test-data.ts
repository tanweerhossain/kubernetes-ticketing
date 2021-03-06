import { getJWT, OrderStatus } from "@tanweerhossain/common";
import { Types } from "mongoose";

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

export const sampleCookie2 = (id?: string): string =>
  `express:sess=${Buffer
    .from(
      JSON.stringify({
        jwt: getJWT({
          id: id || new Types.ObjectId().toHexString(),
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
  id: new Types.ObjectId().toHexString(),
  status: OrderStatus.Created,
  userId: new Types.ObjectId().toHexString(),
  expiresAt: new Date(Date.now() + 900000),
  version: 0,
  ticket: {
    id: new Types.ObjectId().toHexString(),
    price: 10
  }
};

export const sampleTicket2 = {
  title: 'Item2',
  price: 20
};