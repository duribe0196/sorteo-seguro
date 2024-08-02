"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React from "react";
import Link from "next/link";

const statusMap = {
  draft: "Borrador",
  publish: "Publicado",
  cancelled: "Cancelada",
  completed: "Completado",
};

export function RafflesTable(props: any) {
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
              <span>
                <Link
                  href={`/my-profile/raffles/${raffle._id}`}
                  className="hover:bg-default hover:text-white"
                >
                  Ver más
                </Link>
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
    </>
  );
}
