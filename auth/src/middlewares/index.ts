import { Express } from 'express';
import bodyParser from 'body-parser';
import { mongoSetup } from './db-setup';

export const attachMiddlewares = async (app: Express): Promise<void> => {
  app.use(bodyParser.json());
  await mongoSetup();
};