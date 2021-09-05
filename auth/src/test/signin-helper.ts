import request, { Response, Test } from "supertest";
import { app } from "../app";
import { sampleUserData1 } from "../constants/sample-data";

const endpoint: string = '/api/users/signin';

export const signInCookie = async ():
  Promise<string[]> => {
  const response:
    Response = await request(app)
      .post(endpoint)
      .send(sampleUserData1)
      .expect(201);
  return response.get('Set-Cookie');
};