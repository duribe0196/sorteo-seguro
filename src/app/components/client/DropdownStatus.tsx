"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

export function DropdownStatus(props: any) {
  return (
    <Dropdown
      classNames={{
        trigger: "bg-primary text-white border-0",
      }}
    >
      <DropdownTrigger>
        <Button variant="bordered">{props.selectedStatus.name}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {props.statuses.map((item: any) => (
          <DropdownItem
            key={item.value}
            value={item.value}
            color={props.currentStatus === item.value ? "primary" : "default"}
            className={
              props.currentStatus === item.value ? "text-primary" : "text-black"
            }
            onClick={() => props.setSelectedStatus(item)}
          >
            {props.currentStatus === item.value
              ? `Estado actual: ${item.name}`
              : item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
