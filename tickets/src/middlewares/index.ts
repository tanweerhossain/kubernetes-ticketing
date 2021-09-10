import { Express } from 'express';
import bodyParser from 'body-parser';
import CookieSession from "cookie-session";

import { mongoSetup } from './db-setup';

export const attachMiddlewares = async (app: Express): Promise<void> => {
  app.set('trust proxy', true);
  app.use(bodyParser.json());

  app.use(
    CookieSession({
      signed: false,
      secure: (process.env.mode?.trim() !== 'test')
    })
  );

  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is missing');

  if (process.env.mode?.trim() !== 'test') {
    if (!process.env.MONGO_DB_URL) throw new Error('MONGO_DB_URL is missing');
    await mongoSetup();
  }
};