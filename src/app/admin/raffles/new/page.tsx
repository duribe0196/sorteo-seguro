import { redirect } from "next/navigation";
import CreateRaffle from "@/app/components/client/CreateRaffle";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NewDraw() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className={""}>
      <CreateRaffle />
    </div>
  );
}
