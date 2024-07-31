"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getSelectedTickets,
  addSelectedTicket,
  removeSelectedTicket,
  saveSelectedTickets,
} from "@/lib/utils/localStorage";
import { selectTicket } from "@/lib/actions/raffles";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

export interface SelectedTicketsContextType {
  selectedTickets: string[];
  freeTicketsCount: number;
  usedFreeTicketsCount: number;
  selectTicketById: (ticketId: string) => Promise<void>;
  deselectTicketById: (ticketId: string) => Promise<void>;
  markTicketAsFree: (ticketId: string) => Promise<void>;
  markTicketAsPay: (ticketId: string) => Promise<void>;
}

const SelectedTicketsContext = createContext<
  SelectedTicketsContextType | undefined
>(undefined);

export const SelectedTicketsProvider = ({ children }: any) => {
  const { data } = useSession();

  const [selectedTickets, setSelectedTickets] = useState<any[]>([]);
  const [freeTicketsCount, setFreeTicketsCount] = useState<number>(0);
  const [usedFreeTicketsCount, setUsedFreeTicketsCount] = useState<number>(0);

  useEffect(() => {
    const tickets = getSelectedTickets() || [];
    setSelectedTickets(tickets);
    setFreeTicketsCount(data?.user?.freeTickets ?? 0);
  }, [data?.user?.freeTickets]);

  useEffect(() => {
    const usedFreeTickets = selectedTickets.reduce((acc, curr) => {
      if (curr.isFree) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
    setUsedFreeTicketsCount(usedFreeTickets);
  }, [selectedTickets]);

  const selectTicketById = async (ticket: any) => {
    const result = await selectTicket(ticket._id);
    if (result.isAvailable) {
      addSelectedTicket(ticket);
      setSelectedTickets(getSelectedTickets());
    }
  };

  const markTicketAsFree = async (ticketId: any) => {
    const tickedFound = selectedTickets.find(
      (selectedTicket) => selectedTicket._id === ticketId,
    );
    tickedFound.isFree = true;
    saveSelectedTickets(selectedTickets);
    setSelectedTickets(getSelectedTickets());
  };

  const markTicketAsPay = async (ticketId: any) => {
    const tickedFound = selectedTickets.find(
      (selectedTicket) => selectedTicket._id === ticketId,
    );
    tickedFound.isFree = false;
    saveSelectedTickets(selectedTickets);
    setSelectedTickets(getSelectedTickets());
  };

  const deselectTicketById = async (ticketId: string) => {
    removeSelectedTicket(ticketId);
    setSelectedTickets(getSelectedTickets());
  };

  return (
    <SelectedTicketsContext.Provider
      value={{
        selectedTickets,
        selectTicketById,
        deselectTicketById,
        markTicketAsFree,
        markTicketAsPay,
        freeTicketsCount,
        usedFreeTicketsCount,
      }}
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
