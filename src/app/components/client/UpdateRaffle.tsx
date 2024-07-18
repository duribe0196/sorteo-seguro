"use client";
import { DropdownStatus } from "@/app/components/client/DropdownStatus";
import { deleteRaffle, updateRaffle } from "@/lib/actions/raffles";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { parseDate } from "@internationalized/date";
import { RangeCalendar } from "@nextui-org/calendar";
import { useEffect, useState } from "react";
import { extractRaffleInfoToUpdate } from "@/lib/utils/formData";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useRouter } from "next/navigation";

const statuses = [
  {
    name: "Editar",
    value: "draft",
  },

  {
    name: "Cancelada",
    value: "cancelled",
  },
  {
    name: "Publicada",
    value: "publish",
  },
];

export function UpdateRaffle(props: any) {
  const initStatus = statuses.find((i) => i.value === props.raffle.status);

  const parsedStartDate = parseDate(
    props.raffle.startDate.toString().substring(0, 10),
  );
  const parsedEndDate = parseDate(
    props.raffle.endDate.toString().substring(0, 10),
  );

  const router = useRouter();
  const [startDate, setStartDate] = useState(parsedStartDate);
  const [endDate, setEndDate] = useState(parsedEndDate);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(initStatus);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const sendUpdateRaffle = async (formData: FormData) => {
    setErrorMessage("");
    const raffleInfo: any = extractRaffleInfoToUpdate(formData);
    raffleInfo.startDate = startDate.toString();
    raffleInfo.endDate = endDate.toString();
    raffleInfo.status = selectedStatus?.value;
    const response = await updateRaffle(raffleInfo);
    if (response.fail) {
      setErrorMessage(response.message);
    }
    setIsSaving(false);
  };

  const sendDeleteRaffle = async (raffleId: string) => {
    setErrorMessage("");
    const response = await deleteRaffle(raffleId);
    if (response.fail) {
      setErrorMessage(response.message);
    }
    setIsRemoving(false);
    if (response.success) {
      router.replace("/my-profile/raffles");
    }
  };

  useEffect(() => {
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  return (
    <>
      <form
        action={sendUpdateRaffle}
        onSubmit={() => {
          setIsSaving(true);
        }}
      >
        <div key={props.raffle.uid} className="flex flex-col gap-10 px-4 py-5">
          <div className={"mt-2"}>
            <Input
              name="_id"
              id="_id"
              type={"hidden"}
              labelPlacement={"outside"}
              readOnly={true}
              value={props.raffle._id}
            />
          </div>
          <div className={"mt-2"}>
            <Input
              name="raffleName"
              id="raffleName"
              label={"Nombre"}
              labelPlacement={"outside"}
              defaultValue={props.raffle.raffleName}
            />
          </div>
          <div className={"mt-2"}>
            <Input
              name="award"
              id="award"
              label={"Premio"}
              labelPlacement={"outside"}
              defaultValue={props.raffle.award}
            />
          </div>
          <div className={"mt-2"}>
            <Input
              name="numberOfTickets"
              id="numberOfTickets"
              type="number"
              label={"Numero de tickets"}
              labelPlacement={"outside"}
              defaultValue={props.raffle.numberOfTickets}
              className={
                "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              }
            />
          </div>
          <div className={"mt-2"}>
            <Input
              name="minimumNumberOfTicketsPerUser"
              id="minimumNumberOfTicketsPerUser"
              label={"Minimo de boletas por usuario"}
              labelPlacement={"outside"}
              defaultValue={props.raffle.minimumNumberOfTicketsPerUser}
              className={
                "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              }
            />
          </div>
          <div className={"mt-2"}>
            <Input
              name="ticketPrice"
              id="ticketPrice"
              label={"Precio por cada boleta"}
              labelPlacement={"outside"}
              defaultValue={props.raffle.ticketPrice}
              className={
                "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              }
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Fecha de inicio - Fecha de fin
            </label>
            <span>
              ¿Cuando empieza el sorteo? y ¿Cuando finaliza el sorteo?
            </span>
            <div>
              <RangeCalendar
                className={"mt-2"}
                aria-label="Date (Uncontrolled)"
                defaultValue={{
                  start: startDate,
                  end: endDate,
                }}
                onChange={({ start, end }) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
                visibleMonths={2}
                color={"primary"}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            Actualizar estado del sorteo
            <DropdownStatus
              currentStatus={props.raffle.status}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              statuses={statuses}
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button
              type={"submit"}
              color={"secondary"}
              className={"text-white"}
              isLoading={isSaving}
            >
              Guardar
            </Button>
            <Button
              type={"button"}
              onPress={onOpen}
              color={"danger"}
              isLoading={isRemoving}
              isDisabled={isSaving}
            >
              Eliminar
            </Button>
          </div>
          <div>
            <p className={"p-5 flex text-danger"}>{errorMessage}</p>
          </div>
        </div>
      </form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Seguro de eliminar el sorteo?
              </ModalHeader>
              <ModalBody>
                <p>
                  Esta acción no tiene reversa, una vez elimines el sorteo no
                  podras recuperarlo.
                </p>
                <p>Si quieres un nuevo sorteo, tendras que crearlo</p>
                <p>
                  <Button
                    color="danger"
                    onPress={async () => {
                      setIsRemoving(true);
                      await sendDeleteRaffle(props.raffle._id);
                      onClose();
                    }}
                  >
                    Si quiero eliminar
                  </Button>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  No quiero eliminar el sorteo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
