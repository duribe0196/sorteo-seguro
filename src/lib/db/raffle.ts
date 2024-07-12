import mongoose, { Document, Model, Schema } from "mongoose";
import { z } from "zod";

export interface IRaffle {
  raffleName: String;
  numberOfTickets: Number;
  award: String;
  ticketPrice: Number;
  startDate: Date;
  endDate: Date;
  minimumNumberOfTicketsPerUser: Number;
  createdAt: String;
  owner: mongoose.Types.ObjectId;
  status: String;
}

export type IRaffleDocument = IRaffle & Document;

const raffleSchema: Schema<IRaffleDocument> = new mongoose.Schema({
  raffleName: String,
  numberOfTickets: Number,
  award: String,
  ticketPrice: Number,
  startDate: Date,
  endDate: Date,
  minimumNumberOfTicketsPerUser: Number,
  createdAt: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  status: String,
});

export const RaffleModel: Model<IRaffleDocument> =
  mongoose.models.Raffles ||
  mongoose.model<IRaffleDocument>("Raffles", raffleSchema);

export const raffleValidationSchema = z.object({
  raffleName: z.string(),
  numberOfTickets: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number(),
  ),
  award: z.string(),
  ticketPrice: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  startDate: z.preprocess((val) => new Date(val as string), z.date()),
  endDate: z.preprocess((val) => new Date(val as string), z.date()),
  minimumNumberOfTicketsPerUser: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number(),
  ),
  status: z.enum(["draft", "publish"]).optional(),
});
