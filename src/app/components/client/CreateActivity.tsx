"use client";

import dayjs from "dayjs";
import "dayjs/locale/es";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { Button } from "@nextui-org/button";
import { TbReport } from "react-icons/tb";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { AiOutlineFieldNumber } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import CreateChangeDateActivity from "@/app/components/client/CreateChangeDateActivity";
import CreateWinnerActivity from "@/app/components/client/CreateWinnerActivity";
import CreateNoWinnerActivity from "@/app/components/client/CreateNoWinnerActivity";

export default function CreateActivity(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const lastActivity = props.activities.findLast(
    (activity: any) => activity.type === "DATE_CHANGE",
  );

  return (
    <>
      <Button
        className={"text-black w-1/2 mt-2"}
        color={"primary"}
        endContent={<TbReport size={30} />}
        onClick={onOpen}
        disabled={["completed", "cancelled"].includes(props.raffle.status)}
      >
        Crear Actividad
      </Button>
      <p className={"text-black"}>
        {["completed", "cancelled"].includes(props.raffle.status)
          ? "No puedes agregar más actividades porque el sorteo se ha completado o cancelado"
          : ""}
      </p>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear actividad
              </ModalHeader>
              <ModalBody>
                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="Cambio de fecha"
                    title="Cambio de fecha"
                    subtitle={
                      "No hubo ganador, el sorteo se volvera a jugar con una nueva fecha y todos los participantes siguen con sus boletas. Es una nueva oportunidad para ganar"
                    }
                  >
                    <CreateChangeDateActivity
                      raffle={props.raffle}
                      lastActivity={lastActivity}
                      onClose={onClose}
                    />
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Hubo un ganador"
                    title="Hubo un ganador"
                    subtitle={"Hubo ganador, el sorteo se ha completado"}
                  >
                    <CreateWinnerActivity
                      raffle={props.raffle}
                      onClose={onClose}
                    />
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    title="No hubo ganador"
                    subtitle={"No hubo ganador, terminar sorteo SIN GANADOR"}
                  >
                    <CreateNoWinnerActivity
                      raffle={props.raffle}
                      onClose={onClose}
                    />
                  </AccordionItem>
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
