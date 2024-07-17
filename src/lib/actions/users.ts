"use server";

import { User } from "next-auth";
import { UserModel } from "@/lib/db/user";
import connectToDB from "@/lib/db/connection";

export async function createUser(user: User) {
  await connectToDB();
  try {
    const existingUser = await UserModel.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new UserModel({ ...user });
      await newUser.save();
    } else {
      console.warn("User already exists with email", user.email);
    }
  } catch (e: any) {
    const error = `Error creating the user, ${e.message}`;
    console.error(error);
    return { error };
  }
}

export async function findUser(email: string) {
  await connectToDB();
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return JSON.parse(JSON.stringify(user));
    } else {
      console.warn("No user found with email", email);
      return null;
    }
  } catch (e: any) {
    const error = `Error finding the user, ${e.message}`;
    console.error(error);
    return { error };
  }
}

export async function findUserPopulated(email: string): Promise<any> {
  await connectToDB();
  try {
    const user = await UserModel.findOne({ email })
      .populate("referredBy")
      .populate("referrals")
      .exec();

    if (user) {
      return user;
    } else {
      console.warn("No user found with email", email);
      return null;
    }
  } catch (e: any) {
    const error = `Error getting referrals, ${e.message}`;
    console.error(error);
    return { error };
  }
}

export async function saveReferral(
  referrerEmail: string,
  referralEmail: string,
): Promise<any> {
  await connectToDB();
  try {
    // Buscar el usuario que refiere por su email
    const referrer: any = await UserModel.findOne({ email: referrerEmail });
    if (!referrer) {
      return { error: `Email ${referrerEmail} no existe` };
    }

    // Buscar el usuario referido por su email
    const referral: any = await UserModel.findOne({ email: referralEmail });
    if (!referral) {
      return { error: `Email ${referralEmail} no existe` };
    }

    if (!referrer.referrals.includes(referral._id)) {
      referrer.referrals.push(referral._id);
      await referrer.save();
    }

    referral.referredBy = referrer._id;
    await referral.save();

    return { message: "Guardado correctamente" };
  } catch (e: any) {
    const error = `Error getting referrals, ${e.message}`;
    console.error(error);
    return { error };
  }
}
