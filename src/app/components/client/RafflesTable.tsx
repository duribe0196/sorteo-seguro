"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { deleteRaffle, publishRaffle } from "@/lib/actions/raffles";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const statusMap = {
  draft: "Borrador",
  publish: "Publicado",
  cancelled: "Cancelada",
  completed: "Completado",
};

export function RafflesTable(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [raffleIdToDelete, setRaffleIdToDelete] = useState("");
  const [raffleIdToPublish, setRaffleIdToPublish] = useState("");
  const [action, setAction] = useState("");
  const router = useRouter();
  const { data } = useSession();

  const sendDeleteRaffle = async (raffleId: string, onClose: any) => {
    setErrorMessage("");
    const response = await deleteRaffle(raffleId);
    if (response.fail) {
      setErrorMessage(response.message);
    }
    setIsRemoving(false);
    if (response.success) {
      onClose();
      router.replace("/admin/raffles");
    }
  };

  const sendPublishRaffle = async (raffleId: string, onClose: any) => {
    setErrorMessage("");
    const response = await publishRaffle({
      raffleId,
      status: "publish",
      userId: data?.user._id,
    });
    if (response.fail) {
      setErrorMessage(response.message);
    }
    setIsRemoving(false);
    if (response.success) {
      onClose();
      router.push(`raffles/${raffleId}`);
    }
  };

  const renderCell = React.useCallback(
    (raffle: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = raffle[columnKey];

      switch (columnKey) {
        case "status":
          // @ts-ignore
          return statusMap[cellValue];

        case "actions":
          return (
            <div>
              <span className={"flex gap-2"}>
                {raffle.status === "draft" ? (
                  <Link href={`/admin/raffles/${raffle._id}`}>
                    <Button
                      color={"primary"}
                      variant={"light"}
                      disabled={["publish", "completed", "canceled"].includes(
                        raffle.status,
                      )}
                    >
                      Editar
                    </Button>
                  </Link>
                ) : null}

                {raffle.status === "draft" ? (
                  <Button
                    color={"danger"}
                    variant={"light"}
                    isLoading={isRemoving}
                    onClick={() => {
                      setAction("edit");
                      setRaffleIdToDelete(raffle._id);
                      onOpen();
                    }}
                  >
                    Eliminar
                  </Button>
                ) : null}

                {raffle.status === "draft" ? (
                  <Button
                    color={"secondary"}
                    variant={"light"}
                    isLoading={isPublishing}
                    onPress={() => {
                      setAction("publish");
                      setRaffleIdToPublish(raffle._id);
                      onOpen();
                    }}
                  >
                    Publicar
                  </Button>
                ) : (
                  <Button color={"secondary"} variant={"light"}>
                    <Link href={`raffles/${raffle._id}`}>Manejar</Link>
                  </Button>
                )}
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );
  return (
    <>
      <Table classNames={{ th: "bg-primary text-white" }}>
        <TableHeader columns={props.columns}>
          {(column: any) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={props.raffles}>
          {(item: any) => (
            <TableRow key={item._id.toString()}>
              {props.columns.map((column: any) => (
                <TableCell key={column.key}>
                  {renderCell(item, column.key)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action === "edit"
                  ? "¿Seguro de eliminar el sorteo?"
                  : "¿Seguro de publicar el sorteo?"}
              </ModalHeader>
              <ModalBody>
                <p>
                  {action === "edit"
                    ? "Esta acción no tiene reversa, una vez elimines el sorteo no podras recuperarlo"
                    : "Una vez publiques el sorteo no podras editarlo, solo podras completarlo y cambiarle la fecha"}
                </p>
                <p>
                  {action === "edit"
                    ? "Si quieres un nuevo sorteo, tendras que crearlo"
                    : ""}
                </p>
                <p>
                  {action === "edit" ? (
                    <Button
                      color="danger"
                      onPress={async () => {
                        setIsRemoving(true);
                        await sendDeleteRaffle(raffleIdToDelete, onClose);
                      }}
                      isLoading={isRemoving}
                      disabled={isRemoving}
                    >
                      Si quiero eliminar
                    </Button>
                  ) : (
                    <Button
                      color="secondary"
                      onPress={async () => {
                        setIsPublishing(true);
                        await sendPublishRaffle(raffleIdToPublish, onClose);
                      }}
                      isLoading={isPublishing}
                      disabled={isPublishing}
                      className={"text-white"}
                    >
                      Si quiero publicar
                    </Button>
                  )}

                  <div>
                    <p className={"p-5 flex text-danger"}>{errorMessage}</p>
                  </div>
                </p>
              </ModalBody>
              <ModalFooter className={"flex flex-col"}>
                <Button color="default" variant="light" onPress={onClose}>
                  Cerrar x
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
