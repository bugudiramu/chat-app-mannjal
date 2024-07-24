import { Schema, Document } from 'mongoose';

export interface Message extends Document {
  clientId: string;
  text: string;
  replyTo?: string;
  timestamp: Date;
}

export const MessageSchema = new Schema({
  clientId: { type: String, required: true },
  text: { type: String, required: true },
  replyTo: { type: String },
  timestamp: { type: Date, default: Date.now },
});
