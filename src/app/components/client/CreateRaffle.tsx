"use client";

import { createRaffle, deleteRaffle } from "@/lib/actions/raffles";
import { Input } from "@nextui-org/input";
import { RangeCalendar } from "@nextui-org/calendar";
import { getLocalTimeZone, today } from "@internationalized/date";
import { createRef, useEffect, useState } from "react";
import { getRaffleInfoToCreate } from "@/lib/utils/formData";
import { Button } from "@nextui-org/button";

export default function CreateRaffle() {
  const [startDate, setStartDate] = useState(today(getLocalTimeZone()));
  const [endDate, setEndDate] = useState(
    today(getLocalTimeZone()).add({ months: 2 }),
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const ref = createRef<HTMLFormElement>();
  const sendCreateRaffle = async (formData: FormData) => {
    setErrorMessage("");
    setResponseMessage("");

    const raffleInfo: any = getRaffleInfoToCreate(formData);
    raffleInfo.startDate = startDate.toString();
    raffleInfo.endDate = endDate.toString();
    const response = await createRaffle(raffleInfo);
    if (response.fail) {
      setErrorMessage(response.message);
    } else {
      setResponseMessage(response.message);
      ref.current?.reset();
    }
    setIsSaving(false);
  };

  useEffect(() => {
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  return (
    <form
      action={sendCreateRaffle}
      ref={ref}
      onSubmit={() => {
        setIsSaving(true);
      }}
    >
      <div className="my-10 p-4">
        <h2 className={"text-black"}>Crear sorteo</h2>

        <div className="mt-2 flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            required
            labelPlacement="outside"
            label={"Nombre del sorteo"}
            type="text"
            name="raffleName"
            id="raffleName"
            placeholder="¿Cual es el nombre del sorteo?"
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2">
          <Input
            required
            labelPlacement="outside"
            label={"Numero total de boletas"}
            type="number"
            name="numberOfTickets"
            onChange={(e) => Math.abs(Number(e.target.value))}
            id="numberOfTickets"
            placeholder="¿#Cuantas boletas en total?"
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2">
          <Input
            required
            labelPlacement="outside"
            label={
              "¿Cuanto es el minimo de boletas que puede comprar un usuario?"
            }
            type="number"
            name="minimumNumberOfTicketsPerUser"
            id="minimumNumberOfTicketsPerUser"
            placeholder="¿#Cuantas boletas minimo se pueden comprar?"
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2">
          <Input
            required
            type="number"
            label="Precio de cada boleta"
            placeholder="0.00"
            name="ticketPrice"
            id="ticketPrice"
            labelPlacement="outside"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span>$</span>
              </div>
            }
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 mt-2">
          <Input
            required
            type="text"
            label="Premio"
            name={"award"}
            placeholder="¿Cual es el premio del sorteo?"
            labelPlacement="outside"
          />
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium leading-6 mt-2"
          >
            Fecha de inicio - Fecha de fin
          </label>
          <span className="mt-2">
            ¿Cuando empieza el sorteo? y ¿Cuando finaliza el sorteo?
          </span>
          <div className="flex gap-x-4 flex-grow mt-2">
            <RangeCalendar
              aria-label="Date (Uncontrolled)"
              minValue={today(getLocalTimeZone())}
              defaultValue={{
                start: today(getLocalTimeZone()),
                end: today(getLocalTimeZone()).add({ months: 2 }),
              }}
              visibleMonths={3}
              onChange={({ start, end }) => {
                console.log(start, end);
              }}
            />
          </div>
        </div>
      </div>

      <div className={"mt-2"}>
        <Button
          type={"submit"}
          color={"secondary"}
          className={"text-white"}
          isLoading={isSaving}
        >
          Guardar
        </Button>
        <div>
          <p className={"p-5 flex text-danger"}>{errorMessage}</p>
          <p className={"p-5 flex"}>{responseMessage}</p>
        </div>
      </div>
    </form>
  );
}
