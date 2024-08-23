import { getCustomerWithCards } from "@/lib/actions/mercadopago";
import { redirect } from "next/navigation";
import GoBack from "@/app/components/client/GoBack";

export default async function UserDetails(props: any) {
  const customerWithCards = await getCustomerWithCards(props.params.id);
  if (!customerWithCards) {
    return redirect("/admin/users");
  }

  return (
    <>
      <GoBack />
      <p className={"text-xl"}>{customerWithCards.email}</p>
      <p className={"text-xl"}>
        {customerWithCards.identification?.type} -{" "}
        {customerWithCards?.identification?.number}
      </p>
      <br />
      <p className={"text-xl"}>Tarjetas asociadas</p>
      {customerWithCards.cards?.map((card: any) => {
        return (
          <div key={card?.id}>
            <p>Propietario: {card?.cardholder.name}</p>
            <p>Expedida por: {card?.issuer.name}</p>
            <p>Ultimos 4 digitos: {card?.last_four_digits}</p>
            <p>Primeros 6 digitos: {card?.first_six_digits}</p>
            <p>
              Tipo: {card?.payment_method.name} -{" "}
              {card?.payment_method.payment_type_id}
            </p>
          </div>
        );
      })}
    </>
  );
}
