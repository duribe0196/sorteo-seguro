"use client";

import { useSelectedTickets } from "./SelectedTicketsContext";

const formatTicketNumber = (number: number) => {
  return number.toString().padStart(4, "0");
};

const TicketsGrid: React.FC<any> = (props) => {
  const { selectTicketById, deselectTicketById, selectedTickets } =
    useSelectedTickets();
  const selectedTicketsIds = selectedTickets.map((ticket: any) => ticket._id);

  return (
    <>
      <div className="grid grid-cols-auto-fill minmax-[50px] gap-4">
        {props.tickets?.map((ticket: any) => {
          const isAlreadyTaken = !!ticket.owner?.email;
          const isAlreadySelected = selectedTicketsIds.includes(ticket._id);

          return (
            <div
              key={ticket._id}
              className={`ticket ${isAlreadyTaken || isAlreadySelected ? "taken" : ""}`}
              onClick={() =>
                isAlreadySelected
                  ? deselectTicketById(ticket._id)
                  : selectTicketById(ticket)
              }
            >
              <h4>{formatTicketNumber(ticket.number)}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TicketsGrid;
