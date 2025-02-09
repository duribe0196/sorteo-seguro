"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { findUser } from "@/lib/actions/users";
import { RaffleModel, raffleValidationSchema } from "@/lib/db/raffle";
import connectToDB from "@/lib/db/connection";
import { TicketModel } from "@/lib/db/ticket";
import { revalidatePath } from "next/cache";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.warn("No session found");
    return {
      success: false,
      fail: true,
      message: "No such session",
    };
  }
  const user: any = await findUser(session.user.email);
  if (!user) {
    console.warn("No user found");
    return {
      success: false,
      fail: true,
      message: "No such user",
    };
  }

  return user;
};

export const createRaffle = async (raffleInfo: any) => {
  await connectToDB();
  try {
    const user = await getUser();
    raffleInfo.owner = user._id;

    const response = raffleValidationSchema.safeParse(raffleInfo);
    if (!response.success) {
      const { errors } = response.error;
      console.error(errors);

      return {
        success: false,
        fail: true,
        message: errors[0].message,
      };
    }

    const raffle = new RaffleModel(raffleInfo);
    const raffleCreated = await raffle.save();

    const tickets = [];
    for (
      let i = 1;
      i <= parseInt(raffleInfo.numberOfTickets!.toString());
      i++
    ) {
      tickets.push({ number: i, raffle: raffleCreated._id });
    }

    await TicketModel.insertMany(tickets);

    revalidatePath("/admin/raffles");
    return {
      success: true,
      fail: false,
      message: "Sorteo creado correctamente",
    };
  } catch (e: any) {
    console.error(e);
    return { success: false, fail: true, message: "Error creando el sorteo" };
  }
};

export const getPublishedRaffles = async () => {
  await connectToDB();
  try {
    const publishedRaffles = await RaffleModel.find({
      $or: [{ status: "publish" }, { status: "completed" }],
    })
      .populate({
        path: "owner",
        match: { role: "admin" },
      })
      .exec();

    const filteredRaffles = publishedRaffles.filter((raffle) => raffle.owner);
    return JSON.parse(JSON.stringify(filteredRaffles));
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export const getRafflesByOwner = async (email: string) => {
  await connectToDB();
  try {
    const user: any = await findUser(email);
    if (!user) {
      console.warn(`getRafflesByOwner - User not found ${email}`);
      return null;
    }

    const raffles = await RaffleModel.find({ owner: user._id });
    return JSON.parse(JSON.stringify(raffles));
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export const getRaffleById = async (raffleId: string) => {
  await connectToDB();
  try {
    const raffle = await RaffleModel.findById(raffleId);
    return JSON.parse(JSON.stringify(raffle));
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export const getTicketsByUser = async (email: string) => {
  await connectToDB();
  try {
    const user: any = await findUser(email);
    if (!user) {
      console.warn(`getTicketsByUser - User not found ${email}`);
      return null;
    }

    const ticketsByUser = await TicketModel.find({ owner: user._id });
    return JSON.parse(JSON.stringify(ticketsByUser));
  } catch (e: any) {
    console.error(`Error getting tickets by user, ${e}`);
    return null;
  }
};

export const getTicketsByRaffle = async (
  raffleId: string,
  limitTicketsPerPage: number,
  page: number,
) => {
  await connectToDB();
  try {
    const tickets = await TicketModel.find({ raffle: raffleId })
      .populate("owner")
      .sort({ number: 1 })
      .skip(limitTicketsPerPage * (page - 1))
      .limit(limitTicketsPerPage);

    return JSON.parse(JSON.stringify(tickets));
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export const getTicketsCountByRaffle = async (raffleId: string) => {
  await connectToDB();
  try {
    return await TicketModel.countDocuments({ raffle: raffleId });
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

interface IPublishRaffle {
  raffleId: string;
  status: string;
  userId?: string;
}
export const publishRaffle = async (args: IPublishRaffle) => {
  await connectToDB();
  try {
    const { userId, status, raffleId } = args;
    const user = await getUser();

    if (!userId || userId !== user._id) {
      return {
        success: false,
        fail: true,
        message: "Error publicando el sorteo",
      };
    }

    await RaffleModel.findOneAndUpdate(
      { _id: raffleId, owner: userId },
      { status: status },
    );

    revalidatePath("admin/raffles");

    return {
      success: true,
      fail: false,
      message: "Sorteo publicado correctamente",
    };
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      fail: true,
      message: "Error publicando el sorteo",
    };
  }
};

export const updateRaffle = async (raffleInfo: any, userId?: string) => {
  await connectToDB();
  try {
    const user = await getUser();

    if (!userId || userId !== user._id) {
      return {
        success: false,
        fail: true,
        message: "Error actualizando el sorteo, usuario no coincide",
      };
    }

    await RaffleModel.findOneAndUpdate(
      { _id: raffleInfo._id, owner: userId },
      raffleInfo,
    );

    const currentNumberOfTickets = await TicketModel.countDocuments({
      raffle: raffleInfo._id,
    });

    if (
      currentNumberOfTickets !==
      parseInt(raffleInfo.numberOfTickets!.toString())
    ) {
      // Eliminar los boletos existentes
      await TicketModel.deleteMany({ raffle: raffleInfo._id });

      // Crear los nuevos boletos
      const tickets = [];
      for (
        let i = 1;
        i <= parseInt(raffleInfo.numberOfTickets!.toString());
        i++
      ) {
        tickets.push(
          new TicketModel({ number: i, owner: null, raffle: raffleInfo._id }),
        );
      }
      await TicketModel.insertMany(tickets);
    }

    revalidatePath("admin/raffles");

    return {
      success: true,
      fail: false,
      message: "Sorteo Actualizado correctamente",
    };
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      fail: true,
      message: "Error actualizando el sorteo",
    };
  }
};

export const deleteRaffle = async (raffleId: string) => {
  await connectToDB();
  try {
    const user = await getUser();
    if (!user) {
      const error = "Usuario no encontrado";
      console.error(error);
      return {
        success: false,
        fail: true,
        message: "Usuario no encontrado",
      };
    }
    const raffle = await RaffleModel.findById(raffleId);
    if (!raffle) {
      const error = "Sorteo no encontrado";
      console.error(error);
      return {
        success: false,
        fail: true,
        message: error,
      };
    }

    if (raffle.owner.toString() !== user._id.toString()) {
      return {
        success: false,
        fail: true,
        message: "No tienes permisos para eliminar el sorteo",
      };
    }

    await Promise.all([
      RaffleModel.findByIdAndDelete(raffleId),
      TicketModel.deleteMany({ raffle: raffleId }),
    ]);

    revalidatePath("admin/raffles");

    return {
      success: true,
      fail: false,
      message: "Sorteo eliminado",
    };
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      fail: true,
      message: "Error eliminando el sorteo",
    };
  }
};

export const selectTicket = async (ticketId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.warn("No session found while selecting ticket");
    return {
      error: "No session found",
    };
  }
  const ticketFound: any = await TicketModel.findById(ticketId)
    .populate("raffle")
    .exec();
  const userFound: any = await findUser(session.user.email);

  if (!userFound || !ticketFound) {
    const errorMessage = "No userFound found or not ticket found";
    console.warn("Ticket already taken");
    return { error: errorMessage };
  }

  if (ticketFound.raffle.status !== "publish") {
    const errorMessage = "Sorteo no esta disponible";
    console.warn("Ticket already taken");
    return { error: errorMessage };
  }

  if (ticketFound.toJSON().owner) {
    const errorMessage = "Ticket already taken";
    console.warn("Ticket already taken");
    return { error: errorMessage };
  }
  return {
    message: "Ticket available",
    isAvailable: true,
  };
};
