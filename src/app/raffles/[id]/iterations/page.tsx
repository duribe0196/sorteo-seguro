import GoBack from "@/app/components/client/GoBack";
import { redirect } from "next/navigation";
import { getRaffleById } from "@/lib/actions/raffles";
import { RaffleDescriptionTable } from "@/app/components/client/RaffleDescriptionTable";
import ListPublicRaffleActivities from "@/app/components/server/ListPublicRaffleActivities";
import { Chip } from "@nextui-org/chip";

export default async function Page({ params }: any) {
  if (!params.id) {
    redirect("/raffles");
  }

  const raffle = await getRaffleById(params.id);

  return (
    <>
      <div className="mt-2  p-4 text-sm text-gray-500">
        <GoBack />
      </div>
      <div className={"p-4 flex flex-col items-center gap-2"}>
        <p className={"text-xl mt-2 text-black"}>Historial</p>
        Estado:{" "}
        <Chip
          variant={"solid"}
          color={"primary"}
          className={"text-black font-bold"}
        >
          {raffle.status}
        </Chip>
        <RaffleDescriptionTable raffle={raffle} />
        <ListPublicRaffleActivities raffle={raffle} />
      </div>
    </>
  );
}
