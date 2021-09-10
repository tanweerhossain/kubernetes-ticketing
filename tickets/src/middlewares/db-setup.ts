import { connect as MongoConnect } from "mongoose";

export const mongoSetup = async (): Promise<void> => {
  try {
    await MongoConnect(process.env.MONGO_DB_URL!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
