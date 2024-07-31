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
import { formatToCOP } from "@/lib/utils/currency";
import dayjs from "dayjs";
dayjs.locale("es");
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export function RaffleDescriptionTable(props: any) {
  return (
    <Accordion variant={"shadow"} defaultSelectedKeys={"1"}>
      <AccordionItem
        key="1"
        aria-label={props.raffle.raffleName}
        title={`Nombre del sorteo: ${props.raffle.raffleName}`}
        subtitle={`Premio: ${props.raffle.award}, precio por boleta: ${formatToCOP(props.raffle.ticketPrice)}`}
      >
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Nombre del Sorteo</TableColumn>
            <TableColumn>¿Cuando juega?</TableColumn>
            <TableColumn>Compra minima de boletas</TableColumn>
            <TableColumn>Precio de cada boleta</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>{props.raffle.raffleName}</TableCell>
              <TableCell>{dayjs(props.raffle.endDate).format("LL")}</TableCell>
              <TableCell>
                {props.raffle.minimumNumberOfTicketsPerUser}
              </TableCell>
              <TableCell>{formatToCOP(props.raffle.ticketPrice)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </AccordionItem>
    </Accordion>
  );
}
