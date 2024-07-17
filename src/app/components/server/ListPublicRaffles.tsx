"use server";

import dayjs from "dayjs";
import "dayjs/locale/es";

import { getPublishedRaffles } from "@/lib/actions/raffles";
import { RaffleCard } from "@/app/components/client/RaffleCard";

dayjs.locale("es");

export async function ListPublicRaffles(props: any) {
  const raffles = await getPublishedRaffles();

  return (
    <div className={"px-4 sm:px-0"}>
      {!raffles.length ? (
        <div className="px-4 sm:px-0 my-10">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            No hay sorteos 🙁
          </h3>
        </div>
      ) : null}

      {raffles.map((raffle: any) => (
        <div key={raffle._id} className="p-5">
          <RaffleCard raffle={raffle} />
        </div>
      ))}
    </div>
  );
}
