"use client";

import { useSelectedTickets } from "./SelectedTicketsContext";
import { Chip } from "@nextui-org/chip";
import { FaCheck } from "react-icons/fa";

const formatTicketNumber = (number: number) => {
  return number.toString().padStart(4, "0");
};

const TicketsGrid: React.FC<any> = (props) => {
  const { selectTicketById, deselectTicketById, selectedTickets } =
    useSelectedTickets();
  const selectedTicketsIds = selectedTickets.map((ticket: any) => ticket._id);

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {props.tickets?.map((ticket: any) => {
        const isAlreadyTaken = !!ticket.owner?.email;
        const isAlreadySelected = selectedTicketsIds.includes(ticket._id);

        return (
          <Chip
            className={"p-1 cursor-pointer"}
            key={ticket._id}
            variant={"bordered"}
            color={`${isAlreadyTaken || isAlreadySelected ? "secondary" : "default"}`}
            onClick={() =>
              isAlreadySelected
                ? deselectTicketById(ticket._id)
                : selectTicketById(ticket)
            }
            endContent={
              <>{isAlreadySelected ? <FaCheck color={"green"} /> : null}</>
            }
          >
            <h4>{formatTicketNumber(ticket.number)}</h4>
          </Chip>
        );
      })}
    </div>
  );
};

export default TicketsGrid;
