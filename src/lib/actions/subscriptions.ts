"use server";

import { SubscriptionModel } from "@/lib/db/subscriptions";

export const getUserSubscription = async (userId?: string) => {
  try {
    return await SubscriptionModel.findOne({ user: userId });
  } catch (e: any) {}
};
