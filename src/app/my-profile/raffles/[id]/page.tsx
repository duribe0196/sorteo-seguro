import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UpdateRaffle } from "@/app/components/client/UpdateRaffle";
import { getRaffleById } from "@/lib/actions/raffles";
import React, { Suspense } from "react";
import GoBack from "@/app/components/client/GoBack";
import HandleMyPublicRaffle from "@/app/components/server/HandleMyPublicRaffle";

export default async function ManageRafflePage(props: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const raffle = await getRaffleById(props.params.id);

  return (
    <div className={"p-5"}>
      <GoBack />
      <br />
      {raffle.status === "draft" ? (
        <Suspense fallback={<div>Cargando sorteo</div>}>
          <UpdateRaffle key={props.params.id} raffle={raffle} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Cargando sorteo</div>}>
          <HandleMyPublicRaffle raffle={raffle} />
        </Suspense>
      )}
    </div>
  );
}
