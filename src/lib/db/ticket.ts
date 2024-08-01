import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserDocument } from "@/lib/db/user";
import { IRaffleDocument } from "@/lib/db/raffle";

export interface ITicket {
  number: number;
  owner?: mongoose.Types.ObjectId | IUserDocument;
  raffle: mongoose.Types.ObjectId | IRaffleDocument;
}

export type ITicketDocument = ITicket & Document;

export const ticketSchema: Schema<ITicketDocument> = new mongoose.Schema({
  number: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  raffle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Raffles",
    required: true,
  },
});

export const TicketModel: Model<ITicketDocument> =
  mongoose.models.Tickets ||
  mongoose.model<ITicketDocument>("Tickets", ticketSchema);
