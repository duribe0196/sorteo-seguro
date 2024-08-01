import { RaffleDescriptionTable } from "@/app/components/client/RaffleDescriptionTable";
import { Chip } from "@nextui-org/chip";
import CreateActivity from "@/app/components/client/CreateActivity";
import { RaffleIterationsTable } from "@/app/components/client/RaffleIterationsTable";

export default async function Page(props: any) {
  return (
    <>
      <div className={"flex flex-col items-center justify-around"}>
        <h1 className={"text-xl text-black"}>Controla tu sorteo aquí</h1>
        Estado:{" "}
        <Chip
          variant={"solid"}
          color={"primary"}
          className={"text-black font-bold"}
        >
          {props.raffle.status}
        </Chip>
      </div>

      <div className={"mt-2 flex items-center justify-center flex-col gap-2"}>
        <CreateActivity raffle={props.raffle} activities={props.activities} />

        <RaffleDescriptionTable raffle={props.raffle} />
        {props.activities.map((activity: any) => (
          <RaffleIterationsTable
            key={activity._id.toString()}
            activity={activity}
            raffle={props.raffle}
          />
        ))}
      </div>
    </>
  );
}
