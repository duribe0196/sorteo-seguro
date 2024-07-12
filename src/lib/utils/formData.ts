import dayjs from "dayjs";

export const extractRaffleInfoToUpdate = (formData: FormData) => {
  return {
    raffleName: formData.get("raffleName"),
    numberOfTickets: formData.get("numberOfTickets"),
    award: formData.get("award"),
    ticketPrice: formData.get("ticketPrice"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    minimumNumberOfTicketsPerUser: formData.get(
      "minimumNumberOfTicketsPerUser",
    ),
    _id: formData.get("_id"),
    status: undefined,
  };
};

export const getRaffleInfoToCreate = (formData: FormData) => {
  return {
    raffleName: formData.get("raffleName"),
    numberOfTickets: formData.get("numberOfTickets"),
    award: formData.get("award"),
    ticketPrice: formData.get("ticketPrice"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    minimumNumberOfTicketsPerUser: formData.get(
      "minimumNumberOfTicketsPerUser",
    ),
    createdAt: dayjs().format("YYYY-MM-DD"),
    owner: undefined,
    status: "draft",
  };
};
