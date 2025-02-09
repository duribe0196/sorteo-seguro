import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminHeader from "@/app/components/client/AdminHeader";

export const metadata: Metadata = {
  title: "Sorteo Seguro",
  description: "Tu lugar seguro para sorteos",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className={"p-4"}>
      {session?.user.role === "admin" ? <AdminHeader /> : null}
      <>{children}</>
    </div>
  );
}
