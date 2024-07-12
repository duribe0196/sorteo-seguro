"use client";

export const saveSelectedTickets = (tickets: any[]) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTickets", JSON.stringify(tickets));
    }
  } catch (e: any) {
    return { error: e.message };
  }
};

export const getSelectedTickets = () => {
  if (typeof window !== "undefined") {
    const tickets = localStorage.getItem("selectedTickets");
    return tickets ? JSON.parse(tickets) : [];
  }
};

export const addSelectedTicket = (ticket: any) => {
  try {
    if (typeof window !== "undefined") {
      const tickets = getSelectedTickets();
      const ticketIds = tickets.map((t: any) => t._id);

      if (!ticketIds.includes(ticket._id)) {
        tickets.push(ticket);
        saveSelectedTickets(tickets);
      }
    }
  } catch (e: any) {
    return { error: e.message };
  }
};

export const removeSelectedTicket = (ticketId: string) => {
  try {
    if (typeof window !== "undefined") {
      const tickets = getSelectedTickets();
      const updatedTickets = tickets.filter(
        (ticket: any) => ticket._id !== ticketId,
      );
      saveSelectedTickets(updatedTickets);
    }
  } catch (e: any) {
    return { error: e.message };
  }
};
