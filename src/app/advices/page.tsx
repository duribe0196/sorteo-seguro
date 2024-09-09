import { ListPublicAdvices } from "@/app/components/server/ListPublicAdvices";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserSubscription } from "@/lib/actions/users";
import { PlanDescription } from "@/app/components/client/PlanDescription";
import { getSubscriptionProducts } from "@/lib/actions/stripe";
import { SigninGoogleButton } from "@/app/components/client/SigninGoogleButton";
import Link from "next/link";

export default async function Advices() {
  const session = await getServerSession(authOptions);
  const [subscription, subscriptionProducts] = await Promise.all([
    getUserSubscription(),
    getSubscriptionProducts(),
  ]);

  return (
    <div className={"p-2"}>
      {session?.user._id && subscription === "active" ? (
        <div className="px-4 sm:px-0 my-10 mt-2 flex flex-col justify-center items-center gap-2">
          <p>
            <Link
              href={"/premium"}
              className={"font-bold text-white bg-primary p-2 rounded"}
            >
              Ir a la comunidad premium
            </Link>
          </p>
        </div>
      ) : null}
      {session?.user._id && subscription === "inactive" ? (
        <div className="px-4 sm:px-0 my-10 mt-2 flex flex-col justify-center items-center gap-2">
          <PlanDescription
            plan={subscriptionProducts ? subscriptionProducts[0] : []}
          />

          <p>
            Bienvenido {session?.user.name}, eres parte de nuestra comunidad
            gratuita
          </p>
        </div>
      ) : null}

      {session?.user._id ? (
        <Suspense fallback={<span>Cargando consejos...</span>}>
          <ListPublicAdvices />
        </Suspense>
      ) : (
        <div className={"px-4 sm:px-0 my-10 mt-2"}>
          <p>Primero debes iniciar sesión para obtener información deportiva</p>
          <SigninGoogleButton />
        </div>
      )}
    </div>
  );
}
