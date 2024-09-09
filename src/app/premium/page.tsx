import { redirect } from "next/navigation";
import { getUserSubscription } from "@/lib/actions/users";

export default async function PremiumPage() {
  const subscription = await getUserSubscription();

  if (subscription !== "active") {
    redirect("advices");
  }

  return <div>You are premium</div>;
}
