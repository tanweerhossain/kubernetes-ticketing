import request, { Response } from "supertest";
import { app } from "../app";
import { sampleCookie, sampleTicket } from "../constants/sample-test-data";

const endpoint: string = '/api/tickets';

export const saveTicketHelper = async ():
  Promise<Response> => {
  return await request(app)
    .post(endpoint)
    .set('Cookie', sampleCookie)
    .send(sampleTicket)
    .expect(201);
};