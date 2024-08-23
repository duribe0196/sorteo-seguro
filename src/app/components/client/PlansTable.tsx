"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import React from "react";
import { formatToCOP } from "@/lib/utils/currency";

export default function PlansTable(props: any) {
  const renderCell = React.useCallback(
    (plan: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = plan[columnKey];

      switch (columnKey) {
        case "price":
          return formatToCOP(plan.auto_recurring.transaction_amount);
        case "frequency":
          return plan.auto_recurring.frequency_type;

        case "billingDay":
          return plan.auto_recurring.billing_day;
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <>
      <Table aria-label="Plans table">
        <TableHeader columns={props.columns}>
          {(column: any) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={props.plans}>
          {(item: any) => (
            <TableRow key={item.id.toString()}>
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
