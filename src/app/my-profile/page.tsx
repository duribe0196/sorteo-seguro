import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getTicketsByUser } from "@/lib/actions/raffles";

export default async function MyProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const tickets = await getTicketsByUser(session.user.email);

  return (
    <div className={"py-5"}>
      <div className="px-4 sm:px-0 my-10">
        {!tickets?.length ? (
          <h3>Aqui apareceran tus boletas cuando las compres</h3>
        ) : (
          <h3>Mis boletas</h3>
        )}
      </div>
    </div>
  );
}
