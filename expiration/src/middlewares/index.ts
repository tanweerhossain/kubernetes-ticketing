import { natsSetup } from './nats-setup';
import { eventListners } from "../events/listeners";

export const attachMiddlewares = async (): Promise<void> => {

  if (!process.env.REDIS_HOST) throw new Error('REDIS_HOST is missing');

  if (process.env.mode?.trim() !== 'test') {
    if (!process.env.NATS_CLUSTER_URL) throw new Error('NATS_CLUSTER_URL is missing');
    if (!process.env.NATS_CLUSTER_ID) throw new Error('NATS_CLUSTER_ID is missing');
    if (!process.env.NATS_CLIENT_ID) throw new Error('NATS_CLIENT_ID is missing');

    await natsSetup();
    eventListners();
  }
};