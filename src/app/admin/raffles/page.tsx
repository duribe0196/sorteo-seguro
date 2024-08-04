import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ListMyRaffles } from "@/app/components/server/ListMyRaffles";

export default async function MyRaffles() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className={"p-5"}>
      <div className="px-4 sm:px-0 my-10">
        <h2 className={"text-black"}>Mis sorteos</h2>
        <p className={"mt-2"}>Aqui puedes gestionar y publicar tus sorteos</p>
      </div>

      <div className={"mt-5 p-5"}>
        <Suspense fallback={<div>Cargando tus sorteos...</div>}>
          <ListMyRaffles userEmail={session.user.email} />
        </Suspense>
      </div>
    </div>
  );
}
