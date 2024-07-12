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

      {/*{raffles?.map((raffle: any) => (*/}
      {/*  <div*/}
      {/*    key={raffle._id}*/}
      {/*    className="mt-6 border-t border-gray-100 bg-gray-100 p-4"*/}
      {/*  >*/}
      {/*    <dl className="divide-y divide-white">*/}
      {/*      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">*/}
      {/*        <dt className="text-sm font-medium leading-6 text-gray-900">*/}
      {/*          Nombre*/}
      {/*        </dt>*/}
      {/*        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">*/}
      {/*          {raffle.raffleName}*/}
      {/*        </dd>*/}
      {/*      </div>*/}
      {/*      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">*/}
      {/*        <dt className="text-sm font-medium leading-6 text-gray-900">*/}
      {/*          Premio*/}
      {/*        </dt>*/}
      {/*        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">*/}
      {/*          {raffle.award}*/}
      {/*        </dd>*/}
      {/*      </div>*/}
      {/*      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">*/}
      {/*        <dt className="text-sm font-medium leading-6 text-gray-900">*/}
      {/*          Compra minima*/}
      {/*        </dt>*/}
      {/*        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">*/}
      {/*          Minimo {raffle.minimumNumberOfTicketsPerUser} boletas por*/}
      {/*          usuario*/}
      {/*        </dd>*/}
      {/*      </div>*/}
      {/*      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">*/}
      {/*        <dt className="text-sm font-medium leading-6 text-gray-900">*/}
      {/*          Fecha de Inicio*/}
      {/*        </dt>*/}
      {/*        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">*/}
      {/*          {dayjs(raffle.startDate, "YYYY-MM-DD").format("MMMM DD, YYYY")}*/}
      {/*        </dd>*/}
      {/*      </div>*/}
      {/*      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">*/}
      {/*        <dt className="text-sm font-medium leading-6 text-gray-900">*/}
      {/*          Fecha de Fin*/}
      {/*        </dt>*/}
      {/*        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">*/}
      {/*          {dayjs(raffle.endDate, "YYYY-MM-DD").format("MMMM DD, YYYY")}*/}
      {/*        </dd>*/}
      {/*      </div>*/}
      {/*      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">*/}
      {/*        <dt className="text-sm font-medium leading-6 text-gray-900"></dt>*/}
      {/*        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">*/}
      {/*          <div className="mt-2 flex items-center text-sm text-gray-500">*/}
      {/*            <Link*/}
      {/*              href={`/raffles/${raffle._id}?page=1`}*/}
      {/*              className="hover:bg-gray-50"*/}
      {/*            >*/}
      {/*              Comprar boletas*/}
      {/*            </Link>*/}
      {/*          </div>*/}
      {/*        </dd>*/}
      {/*      </div>*/}
      {/*    </dl>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  );
}
