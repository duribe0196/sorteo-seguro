"use server";

import {
  ActivityModel,
  ActivityType,
  IActivityDocument,
} from "@/lib/db/activity";
import { revalidatePath } from "next/cache";
import { UserModel } from "@/lib/db/user";
import { RaffleModel } from "@/lib/db/raffle";

export interface ICreateDateChangeActivityArgs {
  newDate: Date;
  raffleId: string;
  ticketPlayed: string;
}
export const createDateChangeActivity = async (
  args: ICreateDateChangeActivityArgs,
) => {
  try {
    const newActivity = new ActivityModel({
      newDate: args.newDate,
      raffle: args.raffleId,
      ticketPlayed: args.ticketPlayed,
      type: ActivityType.DATE_CHANGE,
    });

    await newActivity.save();
    revalidatePath(`/my-profile/raffles/${args.raffleId}`);
    return {
      fail: false,
      success: true,
      message: "OK",
    };
  } catch (e: any) {
    console.error(e);
    return {
      fail: true,
      success: false,
      message: "Hubo un error al crear la actividad",
    };
  }
};

export interface ICreateWinnerActivityArgs {
  raffleId: string;
  ticketPlayed: string;
  email: string;
}
export const createWinnerActivity = async (args: ICreateWinnerActivityArgs) => {
  try {
    const winner = await UserModel.findOne({ email: args.email });
    if (!winner) {
      return {
        success: false,
        fail: true,
        message: `${args.email} no encontrado`,
      };
    }
    const newActivity = new ActivityModel({
      raffle: args.raffleId,
      ticketPlayed: args.ticketPlayed,
      type: ActivityType.TERMINATE_WITH_WINNER,
      winner: winner._id,
    });

    await RaffleModel.findByIdAndUpdate(args.raffleId, { status: "completed" });

    await newActivity.save();
    revalidatePath(`/my-profile/raffles/${args.raffleId}`);
    return {
      fail: false,
      success: true,
      message: "OK",
    };
  } catch (e: any) {
    console.error(e);
    return {
      fail: true,
      success: false,
      message: "Hubo un error al crear la actividad de ganador",
    };
  }
};

export async function getPopulatedActivitiesByRaffleId(raffleId: string) {
  try {
    const activities: IActivityDocument[] = await ActivityModel.find({
      raffle: raffleId,
    })
      .populate("raffle")
      .populate("winner")
      .exec();

    activities.sort((a, b) => {
      if (
        a.type === ActivityType.DATE_CHANGE &&
        b.type !== ActivityType.DATE_CHANGE
      ) {
        return -1;
      } else if (
        a.type !== ActivityType.DATE_CHANGE &&
        b.type === ActivityType.DATE_CHANGE
      ) {
        return 1;
      } else if (
        a.type === ActivityType.DATE_CHANGE &&
        b.type === ActivityType.DATE_CHANGE
      ) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      return 0;
    });

    return JSON.parse(JSON.stringify(activities));
  } catch (error) {
    console.error("Error fetching populated activities:", error);
    throw new Error("Failed to fetch activities");
  }
}

export async function deleteActivityById(activityId: string) {
  try {
    const activity = await ActivityModel.findById(activityId)
      .populate("raffle")
      .exec();
    if (!activity) {
      return {
        success: false,
        fail: true,
        message: "Actividad no encontrada",
      };
    }

    if (
      [
        ActivityType.TERMINATE_WITH_WINNER,
        ActivityType.TERMINATE_WITH_NO_WINNER,
      ].includes(activity.type)
    ) {
      await RaffleModel.findByIdAndUpdate(activity.raffle._id, {
        status: "publish",
      });
    }
    await ActivityModel.findByIdAndDelete(activityId);
    revalidatePath(`/my-profile/raffles/${activity.raffle._id}`);

    return {
      success: true,
      fail: false,
      message: "OK",
    };
  } catch (error) {
    return {
      success: false,
      fail: true,
      message: "Hubo un error eliminando la actividad",
    };
  }
}
