import { initMercadoPago } from "@mercadopago/sdk-react";
import SubscribeForm from "@/app/components/client/SubscriptionForm";

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

export default async function Subscribe() {
  return (
    <div className={"p-2"}>
      <SubscribeForm />
    </div>
  );
}
