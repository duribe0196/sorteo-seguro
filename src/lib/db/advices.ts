import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAdvice {
  sport: string; // "football", "baseball", "tennis", "basketball"
  matchDate: Date;
  teams: Array<{
    name: string;
    odds: number;
  }>;
  predictionType: string; // "winner", "totalGoals", "pointsSpread", etc.
  prediction: string; // "Team A wins", "Over 3 goals", "Team B +5 points", etc.
  analysis: string; // Texto descriptivo del análisis
  createdAt: Date;
  updatedAt: Date;
}

export type IAdviceDocument = IAdvice & Document;

export const adviceSchema: Schema<IAdviceDocument> = new mongoose.Schema(
  {
    sport: {
      type: String,
      enum: ["football", "baseball", "tennis", "basketball"],
      required: true,
    },
    matchDate: {
      type: Date,
      required: true,
    },
    teams: [
      {
        name: {
          type: String,
          required: true,
        },
        odds: {
          type: Number,
          required: true,
        },
      },
    ],
    predictionType: {
      type: String,
      enum: ["winner", "totalGoals", "pointsSpread", "other"],
      required: true,
    },
    prediction: {
      type: String,
      required: true,
    },
    analysis: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const AdviceModel: Model<IAdviceDocument> =
  mongoose.models.Advices ||
  mongoose.model<IAdviceDocument>("Advices", adviceSchema);
