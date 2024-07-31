import { RaffleDescriptionTable } from "@/app/components/client/RaffleDescriptionTable";
import { Chip } from "@nextui-org/chip";
import CreateActivity from "@/app/components/client/CreateActivity";

export default async function Page(props: any) {
  return (
    <>
      <div className={"flex flex-col items-center justify-around"}>
        <h1 className={"text-xl text-black"}>Controla tu sorteo aquí</h1>
        <p>
          Estado:{" "}
          <Chip
            variant={"solid"}
            color={"primary"}
            className={"text-black font-bold"}
          >
            {props.raffle.status}
          </Chip>
        </p>
      </div>

      <div className={"mt-2"}>
        <RaffleDescriptionTable raffle={props.raffle} />
      </div>
      <div className={"mt-2 flex items-center justify-center"}>
        <CreateActivity />
      </div>
    </>
  );
}
