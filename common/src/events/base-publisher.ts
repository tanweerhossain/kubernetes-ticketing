import { Stan } from "node-nats-streaming";
import { Event } from "../interface/event";

export abstract class Publisher<T extends Event> {
  public abstract subject: T['subject'];

  constructor(private client: Stan) { }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) return reject(err);

        console.log('Event Published to subject', this.subject);
        resolve();
      });
    });
  }
}
