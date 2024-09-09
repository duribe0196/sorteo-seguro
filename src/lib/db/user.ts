import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  role: string;
  customerId: string;
  subscriptionStatus: string;
  validSubscription: boolean;
  freeTickets: number;
  referredBy: mongoose.Types.ObjectId;
  referrals: mongoose.Types.ObjectId[];
}

export type IUserDocument = IUser & Document;

const userSchema: Schema<IUserDocument> = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  customerId: { type: String, unique: true },
  subscriptionStatus: { type: String, default: "inactive" },
  role: String,
  freeTickets: { type: Number, default: 1 },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  referrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

export const UserModel: Model<IUserDocument> =
  mongoose.models.Users || mongoose.model<IUserDocument>("Users", userSchema);
