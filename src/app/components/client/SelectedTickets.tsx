"use client";

import { useSelectedTickets } from "./SelectedTicketsContext";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { formatToCOP } from "@/lib/utils/currency";

export default function SelectedTickets(props: any) {
  const {
    selectedTickets,
    deselectTicketById,
    markTicketAsFree,
    markTicketAsPay,
    freeTicketsCount,
    usedFreeTicketsCount,
  } = useSelectedTickets();
  const { status } = useSession();

  const selectedTicketAfterFree = selectedTickets.length - usedFreeTicketsCount;
  const isPaymentDisabled =
    props.raffle.minimumNumberOfTicketsPerUser > selectedTicketAfterFree;

  const handlePayment = () => {
    // Aquí agregar la lógica para procesar el pago
    alert(`Procesando el pago para los tickets: ${selectedTicketAfterFree}`);
  };

  const getTotalPrice = () => {
    return selectedTicketAfterFree * props.raffle.ticketPrice;
  };

  const sortSelectedTickets = useMemo(() => {
    return selectedTickets.sort(
      (a: any, b: any) => parseInt(a.number) - parseInt(b.number),
    );
  }, [selectedTickets]);

  return (
    <>
      {status === "authenticated" ? (
        <div className="p-4 border rounded-md shadow-md bg-white">
          {selectedTickets.length === 0 ? (
            <h3 className="text-xl font-bold mb-4">Selecciona boletos</h3>
          ) : (
            <div className="text-xl font-bold mb-4 flex flex-col">
              <h3 className="text-xl font-bold">Boletos seleccionados</h3>

              <div className={"mt-2 pt-2"}>
                <Tooltip
                  content={
                    "Recuerda que puedes ganar boletos gratis por invitar a más personas"
                  }
                >
                  <Chip color="default" variant={"shadow"}>
                    <p className={"text-white font-bold"}>
                      Puedes usar {freeTicketsCount} Boletos Gratuitos
                    </p>
                  </Chip>
                </Tooltip>
              </div>
              <ul className="flex flex-wrap mb-4 space-x-2">
                {sortSelectedTickets.map((ticket: any) => (
                  <div
                    key={ticket._id}
                    className="flex items-center space-x-1 mb-2 group p-1"
                  >
                    <Chip
                      onClick={(e) => {
                        if (ticket.isFree) {
                          markTicketAsPay(ticket._id);
                        } else if (freeTicketsCount > usedFreeTicketsCount) {
                          markTicketAsFree(ticket._id);
                        }
                      }}
                      color={"secondary"}
                      variant={ticket.isFree ? "shadow" : "shadow"}
                      className={`${ticket.isFree ? "text-black" : "text-white"} cursor-pointer`}
                      onClose={() => {
                        markTicketAsPay(ticket._id);
                        deselectTicketById(ticket._id);
                      }}
                    >
                      {ticket.number.toString().padStart(4, "0")} -{" "}
                      {ticket.isFree ? "Gratis" : null}
                    </Chip>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {selectedTickets.length > 0 ? (
            <div className={"mt-2"}>
              <Button
                className="px-4 py-2 text-white rounded-md"
                onClick={handlePayment}
                color={"primary"}
                disabled={isPaymentDisabled}
                variant={"shadow"}
              >
                Pagar {formatToCOP(getTotalPrice())}
              </Button>
              {isPaymentDisabled ? (
                <p className={"font-bold"}>
                  Debes pagar minimo $
                  {props.raffle.minimumNumberOfTicketsPerUser} boletas
                </p>
              ) : (
                <p className={"accent-green-800"}>Ya puedes pagar</p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
