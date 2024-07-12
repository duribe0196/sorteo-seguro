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
    <div className="px-4 sm:px-0 my-10">
      <h3 className="text-base font-semibold leading-7 text-gray-900">
        Boletas
      </h3>
      <div>
        <TicketsGrid tickets={tickets} />
      </div>
      <Pagination page={pageNumber} totalPages={totalPages} />
    </div>
  );
}
