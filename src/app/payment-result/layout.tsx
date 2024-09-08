import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminHeader from "@/app/components/client/AdminHeader";

export default async function AdvicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <div className={"p-4"}>
      {session?.user.role === "admin" ? <AdminHeader /> : null}
      <>{children}</>
    </div>
  );
}
