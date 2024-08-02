"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import "dayjs/locale/es";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import dayjs from "dayjs";
dayjs.locale("es");
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { AiOutlineDelete } from "react-icons/ai";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { deleteActivityById } from "@/lib/actions/activities";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RaffleIterationsTable(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();

  const isDeleteDisabled =
    ["cancelled", "completed"].includes(props.raffle.status) &&
    props.activity.type === "DATE_CHANGE";

  const getTitle = (type: string, newDate: Date) => {
    switch (type) {
      case "DATE_CHANGE":
        return `No hubo ganador, el sorteo continua con una nueva fecha: ${dayjs(newDate).format("LL")}`;
      case "TERMINATE_WITH_NO_WINNER":
        return "No hubo ganador, el sorteo se ha terminado";
      case "TERMINATE_WITH_WINNER":
        return "Hubo un ganador, el sorteo se ha terminado";
      default:
        return "";
    }
  };

  const getDescription = (type: string, newDate: Date) => {
    switch (type) {
      case "DATE_CHANGE":
        return `El sorteo volver a jugar el día ${dayjs(newDate).format("LL")}`;
      case "TERMINATE_WITH_NO_WINNER":
        return "No hubo ganador, el sorteo se ha terminado";
      case "TERMINATE_WITH_WINNER":
        return "Hubo un ganador, el sorteo se ha terminado";
      default:
        return "";
    }
  };

  const sendDeleteActivity = async (activityId: string, raffleId: string) => {
    setErrorMessage("");
    const response = await deleteActivityById(activityId);
    if (response.fail) {
      setErrorMessage(response.message);
    }
    setIsRemoving(false);
    if (response.success) {
      router.replace(`/my-profile/raffles/${raffleId}`);
    }
  };

  return (
    <div className={"mt-2 w-full"}>
      <Accordion variant={"shadow"} defaultSelectedKeys={"1"}>
        <AccordionItem
          key="1"
          aria-label={props.raffle.raffleName}
          title={getTitle(props.activity.type, props.activity.newDate)}
        >
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Ganador</TableColumn>
              <TableColumn>Nueva fecha</TableColumn>
              <TableColumn>Numero jugado</TableColumn>
              <TableColumn>Descripción</TableColumn>
              <TableColumn>Accion</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>
                  {props.activity.winner
                    ? props.activity.winner.email
                    : "No hubo ganador"}
                </TableCell>
                <TableCell>
                  {props.activity.newDate &&
                  props.activity.type === "DATE_CHANGE"
                    ? dayjs(props.activity.newDate).format("LL")
                    : "No Aplica"}
                </TableCell>
                <TableCell>{props.activity.ticketPlayed}</TableCell>
                <TableCell className={"text-balance"}>
                  {getDescription(props.activity.type, props.activity.newDate)}
                </TableCell>
                <TableCell>
                  <Button
                    variant={"ghost"}
                    color={"danger"}
                    onClick={onOpen}
                    disabled={isDeleteDisabled}
                    size={"sm"}
                  >
                    Eliminar
                    <AiOutlineDelete size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionItem>
      </Accordion>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Seguro de eliminar la actividad?
              </ModalHeader>
              <ModalBody>
                <p>
                  Esta acción no tiene reversa, una vez elimines la actividad,
                  no podras recuperarla.
                </p>
                <p>Si quieres una nueva actividad, tendras que crearla</p>
                <p>
                  <Button
                    color="danger"
                    onPress={async () => {
                      setIsRemoving(true);
                      await sendDeleteActivity(
                        props.activity._id,
                        props.raffle._id,
                      );
                      onClose();
                    }}
                  >
                    Si quiero eliminar
                  </Button>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  No quiero eliminar la actividad
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
