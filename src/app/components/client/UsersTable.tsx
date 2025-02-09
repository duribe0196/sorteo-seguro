"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteUser } from "@/lib/actions/users";
import { useSession } from "next-auth/react";

export default function UsersTable(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRemoving, setIsRemoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userToDelete, setUserToDelete] = useState("");
  const router = useRouter();
  const session = useSession({ required: true });

  const renderCell = React.useCallback(
    (user: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className={"flex flex-row gap-1"}>
              <Button color={"secondary"} variant={"bordered"}>
                <Link href={`/admin/users/${user._id}`}>Ver más</Link>
              </Button>
              <Button
                color={"danger"}
                variant={"bordered"}
                isLoading={false}
                onClick={() => {
                  onOpen();
                  setUserToDelete(user._id);
                }}
                disabled={user._id === session.data?.user._id}
              >
                Eliminar
              </Button>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [session.status],
  );

  const sendDeleteUser = async (userId: string, onClose: any) => {
    setErrorMessage("");
    const response = await deleteUser(userId);
    if (response.fail) {
      setErrorMessage(response.message);
    }
    setIsRemoving(false);
    if (response.success) {
      onClose();
      router.replace("/admin/users");
    }
  };

  if (session.status === "loading") {
    return <p>Cargando datos de usuario...</p>;
  }

  return (
    <>
      <Table aria-label="Plans table">
        <TableHeader columns={props.columns}>
          {(column: any) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={props.users}>
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
                ¿Seguro de eliminar al usuario?
              </ModalHeader>
              <ModalBody>
                <Button
                  color="danger"
                  onPress={async () => {
                    setIsRemoving(true);
                    await sendDeleteUser(userToDelete, onClose);
                  }}
                  isLoading={isRemoving}
                  disabled={isRemoving}
                >
                  Si quiero eliminar
                </Button>

                <div>
                  <p className={"p-5 flex text-danger"}>{errorMessage}</p>
                </div>
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
