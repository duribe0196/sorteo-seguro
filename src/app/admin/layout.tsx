import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminHeader from "@/app/components/client/AdminHeader";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    redirect("/advices");
  }

  return (
    <div className={"p-4"}>
      {session?.user.role === "admin" ? <AdminHeader /> : null}
      <>{children}</>
    </div>
  );
}
