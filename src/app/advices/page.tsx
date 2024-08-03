import { ListPublicAdvices } from "@/app/components/server/ListPublicAdvices";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserSubscription } from "@/lib/actions/subscriptions";
import { PlanDescription } from "@/app/components/client/PlanDescription";

export default async function Advices() {
  const session = await getServerSession(authOptions);
  const subscription = await getUserSubscription(session?.user._id);

  return (
    <div className={"p-2"}>
      {subscription ? (
        <>
          <div className="px-4 sm:px-0 my-10 mt-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Consejos deportivos
            </h2>
          </div>

          <Suspense fallback={<span>Cargando consejos...</span>}>
            <ListPublicAdvices />
          </Suspense>
        </>
      ) : (
        <div className="px-4 sm:px-0 my-10 mt-2 flex flex-col justify-center items-center gap-2">
          <PlanDescription />
        </div>
      )}
    </div>
  );
}
