"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "next-auth";
import { UserModel } from "@/lib/db/user";
import connectToDB from "@/lib/db/connection";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  await connectToDB();
  try {
    const users = await UserModel.find();
    return JSON.parse(JSON.stringify(users));
  } catch (e: any) {
    const error = `Error getting all the users, ${e.message}`;
    console.error(error);
    return { error };
  }
}

export async function deleteUser(userId: string) {
  await connectToDB();
  try {
    await UserModel.findByIdAndDelete(userId);
    return {
      success: true,
      fail: false,
      message: "OK",
    };
  } catch (e: any) {
    const error = `Error deleting the user, ${e.message}`;
    console.error(error);
    return {
      success: false,
      fail: true,
      message: "Hubo un error al eliminar el usuario",
    };
  }
}

export async function createUser(user: User) {
  await connectToDB();
  try {
    const existingUser = await UserModel.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new UserModel({ ...user, freeTickets: 1, role: "user" });
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

export async function findUserById(userId: string) {
  await connectToDB();
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      return JSON.parse(JSON.stringify(user));
    } else {
      console.warn("No user found with id", userId);
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
      return {
        message: `Email "${referrerEmail}" no existe en nuestra base de datos`,
        fail: true,
        success: false,
      };
    }

    // Buscar el usuario referido por su email
    const referral: any = await UserModel.findOne({ email: referralEmail });
    if (!referral) {
      return {
        message: `Email "${referralEmail}" no existe en nuestra base de datos`,
        fail: true,
        success: false,
      };
    }

    if (!referrer.referrals.includes(referral._id)) {
      referrer.referrals.push(referral._id);
      referrer.freeTickets = referrer.freeTickets + 1;
      await referrer.save();
    }

    referral.referredBy = referrer._id;
    await referral.save();

    revalidatePath("/my-profile/referrals");
    return { message: "Guardado correctamente", fail: false, success: true };
  } catch (e: any) {
    const error = `Error getting referrals, ${e.message}`;
    console.error(error);
    return { message: "Algo salió mal", fail: true, success: false };
  }
}

export const getUserSubscription = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userFound = await UserModel.findById(session?.user._id);
    return userFound?.subscriptionStatus;
  } catch (e: any) {
    return null;
  }
};

interface ISaveCustomerIdFromStripe {
  email: string;
  customerId: string;
}
export const saveCustomerIdFromStripe = async (
  args: ISaveCustomerIdFromStripe,
) => {
  try {
    return await UserModel.findOneAndUpdate(
      { email: args.email },
      { $set: { customerId: args.customerId } },
      { new: true },
    );
  } catch (e: any) {
    const error = `Error saving customer id from stripe, ${e.message}`;
    console.error(error);
  }
};

interface IUpdateSubscriptionStatus {
  customerId: string;
  status: string;
}
export const updateSubscriptionStatus = async (
  args: IUpdateSubscriptionStatus,
) => {
  console.log("Updating here", args);
  try {
    return await UserModel.findOneAndUpdate(
      { customerId: args.customerId },
      { $set: { subscriptionStatus: args.status } },
      { new: true },
    );
  } catch (e: any) {
    const error = `Error updating subscription status, ${e.message}`;
    console.error(error);
  }
};
