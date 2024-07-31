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
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import { MailIcon } from "@nextui-org/shared-icons";

export default function CreateActivity() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={"text-black w-1/2 mt-2"}
        color={"primary"}
        endContent={<TbReport size={30} />}
        onClick={onOpen}
      >
        Crear Actividad
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear actividad
                <p>Aqui puedes definir un cambio de fecha,</p>
              </ModalHeader>
              <ModalBody>
                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="Cambio de fecha"
                    title="Cambio de fecha"
                    subtitle={
                      "No hubo ganador, el sorteo se volvera a jugar con una nueva fecha"
                    }
                  >
                    <div className={"flex flex-col gap-2"}>
                      <Input
                        type="text"
                        label="Número jugado"
                        placeholder="Número"
                        labelPlacement="outside"
                        startContent={
                          <AiOutlineFieldNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                      <DatePicker
                        label="Nueva fecha"
                        className="max-w-[284px]"
                        labelPlacement={"outside"}
                      />
                      <Button
                        className={"text-black font-bold"}
                        color="secondary"
                        onPress={async () => {
                          console.log(
                            "Call Server Action to create activities",
                          );
                          onClose();
                        }}
                      >
                        Guardar nueva fecha
                      </Button>
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Hubo un ganador"
                    title="Hubo un ganador"
                    subtitle={"Hubo ganador, el sorteo se ha completado"}
                  >
                    <div className={"flex flex-col gap-1"}>
                      <Input
                        type="email"
                        label="Selecciona al ganador"
                        placeholder="correo electronico"
                        labelPlacement="outside"
                        startContent={
                          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                      <Input
                        type="text"
                        label="Número ganador"
                        placeholder="Número"
                        labelPlacement="outside"
                        startContent={
                          <AiOutlineFieldNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                      <Button
                        className={"text-black font-bold mt-2"}
                        color="secondary"
                        onPress={async () => {
                          console.log(
                            "Call Server Action to create activities",
                          );
                          onClose();
                        }}
                      >
                        Finalizar sorteo CON GANADOR
                      </Button>
                    </div>
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    title="No hubo ganador"
                    subtitle={"No hubo ganador, terminar sorteo SIN GANADOR"}
                  >
                    <div className={"flex flex-col gap-2"}>
                      <Input
                        type="text"
                        label="Número jugado"
                        placeholder="Número"
                        labelPlacement="outside"
                        startContent={
                          <AiOutlineFieldNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                      />
                      <Button
                        className={"text-black font-bold"}
                        color="secondary"
                        onPress={async () => {
                          console.log(
                            "Call Server Action to create activities",
                          );
                          onClose();
                        }}
                      >
                        Finalizar sorteo SIN GANADOR
                      </Button>
                    </div>
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
