"use client";

import { useSelectedTickets } from "./SelectedTicketsContext";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SelectedTickets(props: any) {
  const { selectedTickets, deselectTicketById } = useSelectedTickets();
  const [useFreeTickets, setUseFreeTickets] = useState(true);
  const { data } = useSession();
  const freeTicketsCount = data?.user.freeTickets || 0;

  const isPaymentDisabled =
    props.raffle.minimumNumberOfTicketsPerUser > selectedTickets.length;

  const handlePayment = () => {
    // Aquí agregar la lógica para procesar el pago
    alert(`Procesando el pago para los tickets: ${selectedTickets.length}`);
  };

  const getTotalPrice = () => {
    const totalPrice =
      selectedTickets.length && props.raffle
        ? selectedTickets.length * props.raffle.ticketPrice
        : 0;

    if (totalPrice > 0) {
      return `$${totalPrice.toFixed(0)}`;
    }

    return "";
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      {selectedTickets.length === 0 ? (
        <h3 className="text-xl font-bold mb-4">
          No tienes tickets seleccionados.
        </h3>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4">Tickets seleccionados</h3>
          <ul className="flex flex-wrap mb-4 space-x-2">
            {selectedTickets.map((ticket: any) => (
              <div
                key={ticket._id}
                className="flex items-center space-x-1 mb-2 group p-1"
              >
                <Chip
                  color="secondary"
                  className={"text-white"}
                  onClose={() => deselectTicketById(ticket._id)}
                >
                  {ticket.number.toString().padStart(4, "0")}
                </Chip>
              </div>
            ))}
          </ul>
        </div>
      )}
      {/*Free tickets*/}
      <Switch
        defaultSelected={useFreeTickets}
        onChange={() => setUseFreeTickets(!useFreeTickets)}
      >
        Usar boletos gratuitos
      </Switch>
      {useFreeTickets ? (
        <>
          {freeTicketsCount === 0 ? (
            <Link href={"/my-profile/referrals"}>
              <h3 className="text-xl font-bold mb-4">
                Invita a alguien para tener boletos gratis
              </h3>
            </Link>
          ) : (
            <div>
              <h3 className="text-xl font-bold mb-4">Tickets gratis usados</h3>
              <ul className="flex flex-wrap mb-4 space-x-2">
                {[].map((ticket: any) => (
                  <>Build here something to apply free tickets</>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : null}

      {selectedTickets.length > 0 && (
        <div className={"mt-2"}>
          <Button
            className="px-4 py-2 text-white rounded-md"
            onClick={handlePayment}
            color={"primary"}
            disabled={isPaymentDisabled}
          >
            Pagar {getTotalPrice()}
          </Button>
          {isPaymentDisabled ? (
            <p className={"font-bold"}>
              Debes escoger minimo ${props.raffle.minimumNumberOfTicketsPerUser}{" "}
              boletas
            </p>
          ) : (
            <p className={"accent-green-800"}>Ya puedes pagar</p>
          )}
        </div>
      )}
    </div>
  );
}
