import { getRafflesByOwner } from "@/lib/actions/raffles";
import { RafflesTable } from "@/app/components/client/RafflesTable";

const columns = [
  {
    key: "raffleName",
    label: "Nombre",
  },
  {
    key: "numberOfTickets",
    label: "Numero de tickets",
  },
  {
    key: "status",
    label: "Estado",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export async function ListMyRaffles(props: any) {
  const raffles = await getRafflesByOwner(props.userEmail);

  return <RafflesTable columns={columns} raffles={raffles || []} />;
}
