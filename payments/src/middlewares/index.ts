import { Express } from 'express';
import bodyParser from 'body-parser';
import CookieSession from "cookie-session";

import { mongoSetup } from './db-setup';
import { natsSetup } from './nats-setup';
import { eventListners } from '../events/listeners';

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
    if (!process.env.STRIPE_KEY) throw new Error('STRIPE_KEY is missing');
    if (!process.env.NATS_CLUSTER_URL) throw new Error('NATS_CLUSTER_URL is missing');
    if (!process.env.NATS_CLUSTER_ID) throw new Error('NATS_CLUSTER_ID is missing');
    if (!process.env.NATS_CLIENT_ID) throw new Error('NATS_CLIENT_ID is missing');
    if (!process.env.MONGO_DB_URL) throw new Error('MONGO_DB_URL is missing');

    await mongoSetup();
    await natsSetup();
    eventListners();
  }
};