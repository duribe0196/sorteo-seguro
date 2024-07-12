"use client";

import { useSelectedTickets } from "./SelectedTicketsContext";
import { FaTrash } from "react-icons/fa";

export default function SelectedTickets() {
  const { selectedTickets, deselectTicketById } = useSelectedTickets();

  const handlePayment = () => {
    // Aquí agregar la lógica para procesar el pago
    alert(`Procesando el pago para los tickets: ${selectedTickets.length}`);
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h3 className="text-xl font-bold mb-4">Tickets Seleccionados</h3>
      {selectedTickets.length === 0 ? (
        <p>No tienes tickets seleccionados.</p>
      ) : (
        <ul className="flex flex-wrap mb-4 space-x-2">
          {selectedTickets.map((ticket: any) => (
            <div
              key={ticket._id}
              className="flex items-center space-x-2 mb-2 group border p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              <span className="mr-2">
                {ticket.number.toString().padStart(4, "0")}
              </span>
              <button
                className="text-red-500 opacity-0 group-hover:opacity-100"
                onClick={() => deselectTicketById(ticket._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </ul>
      )}
      {selectedTickets.length > 0 && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handlePayment}
        >
          Pagar
        </button>
      )}
    </div>
  );
}
