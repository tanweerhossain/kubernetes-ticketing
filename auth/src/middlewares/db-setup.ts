import { connect as MongoConnect } from "mongoose";
import { nconf } from "../conf";

export const mongoSetup = async (): Promise<void> => {
  try {
    await MongoConnect(nconf.get('MONGO-DB-URL'));
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
