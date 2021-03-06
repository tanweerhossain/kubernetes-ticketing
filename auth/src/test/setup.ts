import { MongoMemoryServer } from "mongodb-memory-server";
import { connect as MongoConnect, connection, set } from "mongoose";

let mongo: any;

beforeAll(async (): Promise<void> => {

  // Setup In memory Mongo Configuration
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await MongoConnect(mongoUri);

  Promise.resolve(1);
});

beforeEach(async (): Promise<void> => {
  const collections = await connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
  Promise.resolve(1);
});

afterAll(async () => {
  await connection.close();
  await mongo.stop();
  Promise.resolve(1);
});