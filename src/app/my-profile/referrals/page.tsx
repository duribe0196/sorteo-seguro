import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ListReferrals } from "@/app/components/server/ListReferrals";
import { Suspense } from "react";

export default async function ReferralPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className={"p-5"}>
      <div className="px-4 sm:px-0 my-10">
        <Suspense fallback={<span>Cargando referidos</span>}>
          <ListReferrals email={session.user.email} />
        </Suspense>
      </div>
    </div>
  );
}
