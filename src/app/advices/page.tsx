import { ListPublicAdvices } from "@/app/components/server/ListPublicAdvices";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserSubscription } from "@/lib/actions/users";
import { PlanDescription } from "@/app/components/client/PlanDescription";
import { getSubscriptionProducts } from "@/lib/actions/stripe";

export default async function Advices() {
  const session = await getServerSession(authOptions);
  const [subscription, subscriptionProducts] = await Promise.all([
    getUserSubscription(session?.user._id),
    getSubscriptionProducts(),
  ]);

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
          {subscriptionProducts?.map((plan) => {
            return (
              <div key={plan.id}>
                <PlanDescription plan={plan} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
