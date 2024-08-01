"use client";

import { Input } from "@nextui-org/input";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import { createDateChangeActivity } from "@/lib/actions/activities";
import { parseDate } from "@internationalized/date";
import { useState } from "react";

export default function CreateChangeDateActivity(props: any) {
  const currentEndDate = parseDate(
    props.lastActivity && props.lastActivity.newDate
      ? props.lastActivity.newDate.toString().substring(0, 10)
      : props.raffle.endDate.toString().substring(0, 10),
  );

  const [ticketPlayed, setTicketPlayed] = useState("");
  const [newEndDate, setNewEndDate] = useState(currentEndDate);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const sendCreateChangeDateActivity = async (formData: FormData) => {
    setErrorMessage("");
    const newDate = formData.get("newDate")!.toString();
    const playedNumber = formData.get("playedNumber")!.toString();
    const response = await createDateChangeActivity({
      newDate: new Date(newDate),
      ticketPlayed: playedNumber,
      raffleId: props.raffle._id,
    });
    if (response.fail) {
      setErrorMessage(response.message);
    }
    if (response.success) {
      props.onClose();
    }
    setIsSaving(false);
  };

  return (
    <form
      className={"flex flex-col gap-2"}
      onSubmit={() => {
        setIsSaving(true);
      }}
      action={sendCreateChangeDateActivity}
    >
      <Input
        type="text"
        label="Número jugado"
        name={"playedNumber"}
        id={"playedNumber"}
        placeholder="Número"
        labelPlacement="outside"
        startContent={
          <AiOutlineFieldNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        value={ticketPlayed}
        onChange={(e) => setTicketPlayed(e.target.value)}
      />
      <DatePicker
        label="Nueva fecha"
        className="max-w-[284px]"
        id={"newDate"}
        name={"newDate"}
        labelPlacement={"outside"}
        value={newEndDate}
        onChange={setNewEndDate}
        minValue={currentEndDate}
        maxValue={currentEndDate.add({ months: 1 })}
      />
      <Button
        className={"text-black font-bold"}
        color="secondary"
        type={"submit"}
        isLoading={isSaving}
      >
        Guardar nueva fecha - EL SORTEO CONTINUA
      </Button>
      <div>
        <p className={"p-5 flex text-danger"}>{errorMessage}</p>
      </div>
    </form>
  );
}
