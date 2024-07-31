import GoBack from "@/app/components/client/GoBack";
import { redirect } from "next/navigation";
import { getRaffleById } from "@/lib/actions/raffles";
import { RaffleDescriptionTable } from "@/app/components/client/RaffleDescriptionTable";

export default async function Page({ params }: any) {
  if (!params.id) {
    redirect("/raffles");
  }

  const raffle = await getRaffleById(params.id);

  return (
    <div className={"p-4"}>
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <GoBack />
      </div>
      <p className={"text-xl mt-2"}>Iteraciones</p>
      <div className={"mt-2"}>
        <RaffleDescriptionTable raffle={raffle} />
      </div>
    </div>
  );
}
