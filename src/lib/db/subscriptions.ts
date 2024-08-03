import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserDocument } from "@/lib/db/user";

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ISubscription {
  user: mongoose.Types.ObjectId | IUserDocument;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  freeTickets: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ISubscriptionDocument = ISubscription & Document;

export const subscriptionSchema: Schema<ISubscriptionDocument> =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
      status: {
        type: String,
        enum: Object.values(SubscriptionStatus),
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: false,
      },
    },
    { timestamps: true },
  );

export const SubscriptionModel: Model<ISubscriptionDocument> =
  mongoose.models.Subscriptions ||
  mongoose.model<ISubscriptionDocument>("Subscriptions", subscriptionSchema);
