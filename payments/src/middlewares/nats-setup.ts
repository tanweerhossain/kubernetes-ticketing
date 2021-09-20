import { natsWrapper } from "./nats-wrapper";

export const natsSetup = async (): Promise<void> => {
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      // `NATS-CLIENT-${randomBytes(4).toString('hex')}`,
      process.env.NATS_CLUSTER_URL!);


    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

  } catch (error) {
    console.log(error);
  }
};
