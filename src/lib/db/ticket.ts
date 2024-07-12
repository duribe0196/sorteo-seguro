import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserDocument } from "@/lib/db/user";

export interface ITicket {
  number: number;
  owner?: mongoose.Types.ObjectId;
  raffleId: mongoose.Types.ObjectId;
}

export interface ITicketPopulated {
  number: number;
  owner: IUserDocument;
  raffleId: mongoose.Types.ObjectId;
}

export type ITicketDocument = ITicket & Document;

export const ticketSchema: Schema<ITicketDocument> = new mongoose.Schema({
  number: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  raffleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Raffles",
    required: true,
  },
});

export const TicketModel: Model<ITicketDocument> =
  mongoose.models.Tickets ||
  mongoose.model<ITicketDocument>("Tickets", ticketSchema);
