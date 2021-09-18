import { Document } from "mongoose";

export interface TicketDocInterface extends Document {
  title: string;
  price: number;
  userId: string;
  version: number;
};