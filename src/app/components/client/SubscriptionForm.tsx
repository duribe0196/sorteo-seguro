"use client";

import {
  initMercadoPago,
  createCardToken,
  CardPayment,
} from "@mercadopago/sdk-react";
import { Card } from "@nextui-org/card";
import {
  IAdditionalData,
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from "@mercadopago/sdk-react/bricks/cardPayment/type";

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

export default function SubscribeForm() {
  const getCardToken = async (
    paymentInfo: ICardPaymentFormData<ICardPaymentBrickPayer>,
  ) => {
    console.log(paymentInfo);
  };
  return (
    <div className={"p-4"}>
      <p className={"text-gray p-2"}>
        PremBet NO GUARDA tu información bancaria.
      </p>
      <p className={"text-tiny text-black p-2"}>
        Hemos escogido a Mercado Pago como nuestro aliado para darte seguridad,
        confianza y transparencia en todas nuestras transacciones.
      </p>
      <Card>
        <CardPayment
          initialization={{ amount: 10000 }}
          onSubmit={getCardToken}
          locale={"es-CL"}
        />
      </Card>
    </div>
  );
}
