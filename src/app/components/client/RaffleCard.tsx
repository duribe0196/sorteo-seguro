"use client";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import dayjs from "dayjs";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";

const formatToCOP = (value: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const getRemainingDays = (endDate: string) => {
  const today = dayjs();
  const end = dayjs(endDate);
  const diffDays = end.diff(today, "day");

  return `${diffDays > 1 ? "Quedan" : "Queda"} ${Math.floor(diffDays)}  ${Math.floor(diffDays) > 1 ? "días" : "día"} para el premio`;
};

export function RaffleCard(props: any) {
  return (
    <Card isBlurred shadow="sm" className={"mt-2"}>
      <CardHeader
        className={
          "flex items-center justify-center text-black bg-overlay-foreground"
        }
      >
        <div className={"p-2"}>
          <Link href={`raffles/${props.raffle._id}`}>
            <p className={"text-xl"}>Podrás ganar {props.raffle.award}</p>
          </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-wrap w-full">
          <div className="flex w-full md:w-1/2 flex-col items-center justify-center">
            <Image
              src={"https://nextui.org/images/album-cover.png"}
              alt={`${props.raffle.raffleName} image`}
              width={300}
              className={"rounded-md"}
              isBlurred
              isZoomed
            />
          </div>

          <div className="flex w-full md:w-1/2 flex-col items-center justify-center mt-2 md:mt-0 p-2">
            <Link href={`raffles/${props.raffle._id}`}>
              <div>
                <p className={"text-lg hover:text-primary"}>
                  {props.raffle.raffleName} - Premio {props.raffle.award}
                </p>
                <Divider />
              </div>
            </Link>

            <p className={"text-md mt-2"}>
              Precio por boleta: {formatToCOP(props.raffle.ticketPrice)}
            </p>
            <p className={"text-sm"}>
              {getRemainingDays(props.raffle.endDate)}
            </p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter
        className={"flex items-center justify-center bg-primary text-white"}
      >
        <Link href={`raffles/${props.raffle._id}`}>
          <p className={"text-lg hover:font-extrabold"}>Comprar boletas</p>
        </Link>
      </CardFooter>
    </Card>
  );
}
