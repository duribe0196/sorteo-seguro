import { initMercadoPago } from "@mercadopago/sdk-react";
import SubscribeForm from "@/app/components/client/SubscriptionForm";
import { getPlanById } from "@/lib/actions/mercadopago";
import { redirect } from "next/navigation";

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

export default async function Subscribe(props: any) {
  const planId = props.params.id;
  const foundPlan = await getPlanById(planId);
  if (!foundPlan) redirect("/advices");
  return (
    <div className={"p-2"}>
      <SubscribeForm planId={planId} />
    </div>
  );
}
