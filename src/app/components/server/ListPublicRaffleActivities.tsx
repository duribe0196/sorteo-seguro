import { RaffleIterationsTable } from "@/app/components/client/RaffleIterationsTable";
import { getPopulatedActivitiesByRaffleId } from "@/lib/actions/activities";

export default async function Page(props: any) {
  const activities = await getPopulatedActivitiesByRaffleId(props.raffle._id);
  return (
    <>
      <div
        className={
          "mt-2 flex items-center justify-center flex-col gap-2 w-full"
        }
      >
        {activities.map((activity: any) => (
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
