import { redirect } from "next/navigation";
import { getSubscriptionProductById } from "@/lib/actions/stripe";

export default async function Subscribe(props: any) {
  const planId = props.params.id;
  const foundPlan = await getSubscriptionProductById(planId);
  if (!foundPlan) redirect("/advices");

  console.log(foundPlan);
  return <div className={"p-2"}>{/*<SubscribeForm planId={planId} />*/}</div>;
}
