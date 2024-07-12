"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getSelectedTickets,
  addSelectedTicket,
  removeSelectedTicket,
} from "@/lib/utils/localStorage";
import { selectTicket } from "@/lib/actions/raffles";

export interface SelectedTicketsContextType {
  selectedTickets: string[];
  selectTicketById: (ticketId: string) => Promise<void>;
  deselectTicketById: (ticketId: string) => Promise<void>;
}

const SelectedTicketsContext = createContext<
  SelectedTicketsContextType | undefined
>(undefined);

export const SelectedTicketsProvider = ({ children }: any) => {
  const [selectedTickets, setSelectedTickets] = useState<any[]>([]);

  useEffect(() => {
    const tickets = getSelectedTickets() || [];
    setSelectedTickets(tickets);
  }, []);

  const selectTicketById = async (ticket: any) => {
    const result = await selectTicket(ticket._id);
    if (result.isAvailable) {
      addSelectedTicket(ticket);
      setSelectedTickets(getSelectedTickets());
    }
  };

  const deselectTicketById = async (ticketId: string) => {
    removeSelectedTicket(ticketId);
    setSelectedTickets(getSelectedTickets());
  };

  return (
    <SelectedTicketsContext.Provider
      value={{ selectedTickets, selectTicketById, deselectTicketById }}
    >
      {children}
    </SelectedTicketsContext.Provider>
  );
};

export const useSelectedTickets = (): SelectedTicketsContextType => {
  const context = useContext(SelectedTicketsContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedTickets must be used within a SelectedTicketsProvider",
    );
  }
  return context;
};
