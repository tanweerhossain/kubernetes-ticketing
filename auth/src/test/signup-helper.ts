import request, { Test } from "supertest";
import { app } from "../app";
import { sampleUserData1 } from "../constants/sample-data";

const endpoint: string = '/api/users/signup';

export const signUp = async ():
  Promise<Test> => {
  return await request(app)
    .post(endpoint)
    .send(sampleUserData1)
    .expect(201);
};