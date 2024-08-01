import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserDocument } from "@/lib/db/user";
import { IRaffleDocument } from "@/lib/db/raffle";

export enum ActivityType {
  DATE_CHANGE = "DATE_CHANGE",
  TERMINATE_WITH_WINNER = "TERMINATE_WITH_WINNER",
  TERMINATE_WITH_NO_WINNER = "TERMINATE_WITH_NO_WINNER",
}

export interface IActivity {
  raffle: mongoose.Types.ObjectId | IRaffleDocument;
  type: ActivityType;
  winner?: mongoose.Types.ObjectId | IUserDocument;
  ticketPlayed?: string;
  newDate?: Date;
  createdAt: Date;
}

export type IActivityDocument = IActivity & Document;

export const activitySchema: Schema<IActivityDocument> = new mongoose.Schema(
  {
    raffle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Raffles",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ActivityType),
      required: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    ticketPlayed: {
      type: String,
      required: false,
    },
    newDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export const ActivityModel: Model<IActivityDocument> =
  mongoose.models.Activities ||
  mongoose.model<IActivityDocument>("Activities", activitySchema);
