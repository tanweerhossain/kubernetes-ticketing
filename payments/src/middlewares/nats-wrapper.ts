import { Stan, connect } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client(): Stan {
    if (!this._client) {
      throw new Error("Can\'t access client before connection");
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = connect(clusterId, clientId, { url });

    return new Promise((res, rej) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS Streaming Server');

        res(true);
      });

      this.client.on('error', (err) => {
        rej(err);
      })
    })
  }
};

export const natsWrapper = new NatsWrapper();