import GoBack from "@/app/components/client/GoBack";
import { redirect } from "next/navigation";
import ListRaffleTickets from "@/app/components/server/ListRaffleTickets";
import { Suspense } from "react";
import TicketSkeleton from "@/app/components/server/TicketSkeleton";
import SelectedTickets from "@/app/components/client/SelectedTickets";
import { SelectedTicketsProvider } from "@/app/components/client/SelectedTicketsContext";
import { getRaffleById } from "@/lib/actions/raffles";

export default async function Page({ searchParams, params }: any) {
  let page = parseInt(searchParams.page, 10);
  if (!params.id) {
    redirect("/raffles");
  }
  page = !page || page < 0 ? 1 : page;

  const raffle = await getRaffleById(params.id);

  return (
    <div className={"p-4"}>
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <GoBack />
      </div>

      <h3 className={"text-xl mt-2 font-bold text-primary"}>
        {raffle.raffleName} - Precio por boleta: ${raffle.ticketPrice}
      </h3>

      <div className={"mt-2"}>
        <SelectedTicketsProvider>
          <SelectedTickets raffle={raffle} user={{}} />
          <Suspense fallback={<TicketSkeleton />} key={page}>
            <ListRaffleTickets raffleId={params.id} pageNumber={page} />
          </Suspense>
        </SelectedTicketsProvider>
      </div>
    </div>
  );
}
