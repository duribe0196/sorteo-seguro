import {
  getTicketsByRaffle,
  getTicketsCountByRaffle,
} from "@/lib/actions/raffles";
import TicketsGrid from "@/app/components/client/TicketsGrid";
import Pagination from "@/app/components/client/Pagination";

export default async function ListRaffleTickets({ raffleId, pageNumber }: any) {
  const totalTickets = await getTicketsCountByRaffle(raffleId);
  const perPage = parseInt(process.env.TICKETS_PER_PAGE!);

  const totalPages = (totalTickets || 0) / perPage;

  const tickets = await getTicketsByRaffle(raffleId, perPage, pageNumber);
  return (
    <div className="sm:px-0 mt-2">
      <h3 className="text-xl font-bold mt-2">
        Selecciona tus boletas para el sorteo
      </h3>
      <h3 className="text-lg font-bold mt-2"></h3>
      <div className={"mt-2"}>
        <TicketsGrid tickets={tickets} />
      </div>
      <Pagination page={pageNumber} totalPages={totalPages} />
    </div>
  );
}
