"use client";

import { useSelectedTickets } from "./SelectedTicketsContext";
import { Chip } from "@nextui-org/chip";
import { FaCheck } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

const formatTicketNumber = (number: number) => {
  return number.toString().padStart(4, "0");
};

const TicketsGrid: React.FC<any> = (props) => {
  const { selectTicketById, deselectTicketById, selectedTickets } =
    useSelectedTickets();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const selectedTicketsIds = selectedTickets.map((ticket: any) => ticket._id);

  return (
    <div>
      {!isAuthenticated ? (
        <div className={"p-2"}>
          <Link href={"#"} onClick={() => signIn("google")}>
            <p className={"text-primary"}>
              Debes iniciar sessión para poder comprar boletas
            </p>
            <Button
              color={"primary"}
              variant={"bordered"}
              className={"text-black"}
              onClick={() => signIn("google")}
            >
              Iniciar Session
            </Button>
          </Link>
        </div>
      ) : null}
      <Tooltip
        isDisabled={isAuthenticated}
        content={"Debes ser un usuario registrado para poder comprar tickets"}
      >
        <div className="flex flex-wrap gap-2 items-center mt-2 p-2">
          {props.tickets?.map((ticket: any) => {
            const isAlreadyTaken = !!ticket.owner?.email;
            const isAlreadySelected = selectedTicketsIds.includes(ticket._id);

            return (
              <Chip
                key={ticket._id}
                className={"p-2 cursor-pointer"}
                variant={"bordered"}
                color={`${isAuthenticated && (isAlreadyTaken || isAlreadySelected) ? "secondary" : "default"}`}
                onClick={() =>
                  isAlreadySelected
                    ? deselectTicketById(ticket._id)
                    : selectTicketById(ticket)
                }
                endContent={
                  <>
                    {isAlreadySelected && isAuthenticated ? (
                      <FaCheck color={"green"} />
                    ) : null}
                  </>
                }
                isDisabled={!isAuthenticated}
              >
                <h4>{formatTicketNumber(ticket.number)}</h4>
              </Chip>
            );
          })}
        </div>
      </Tooltip>
    </div>
  );
};

export default TicketsGrid;
