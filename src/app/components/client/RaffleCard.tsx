"use client";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import dayjs from "dayjs";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import { formatToCOP } from "@/lib/utils/currency";
import { Chip } from "@nextui-org/chip";

const getRemainingDays = (endDate: string) => {
  const today = dayjs();
  const end = dayjs(endDate);
  const diffDays = end.diff(today, "day");

  return `🤩 ${diffDays > 1 ? "Quedan" : "Queda"} ${Math.floor(diffDays)}  ${Math.floor(diffDays) > 1 ? "días" : "día"} 🥳`;
};

export function RaffleCard(props: any) {
  const hrefValue =
    props.raffle.status === "publish"
      ? `raffles/${props.raffle._id}`
      : `raffles/${props.raffle._id}/iterations`;
  return (
    <Card isBlurred shadow="sm" className={"mt-2"}>
      <CardHeader
        className={
          "flex items-center justify-center text-black bg-overlay-foreground flex-col content-center"
        }
      >
        <div>
          {props.raffle.status === "publish" ? (
            <Link href={hrefValue}>
              <p className={"text-xl"}>Podrás ganar {props.raffle.award}</p>
            </Link>
          ) : (
            <div className={"flex flex-col justify-center items-center"}>
              <Link href={hrefValue}>
                <p className={"text-xl"}>Se han ganado: {props.raffle.award}</p>
              </Link>
              <Chip variant={"shadow"} className={"text-white mx-auto"}>
                Sorteo Completado
              </Chip>
            </div>
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-wrap w-full">
          <Link
            href={hrefValue}
            className="flex w-full md:w-1/2 flex-col items-center justify-center"
          >
            <Image
              src={"https://nextui.org/images/album-cover.png"}
              alt={`${props.raffle.raffleName} image`}
              width={300}
              className={"rounded-md"}
              isBlurred
              isZoomed
            />
          </Link>

          <div className="flex w-full md:w-1/2 flex-col items-center justify-center mt-2 md:mt-0 p-2">
            <Link href={hrefValue}>
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
              {props.raffle.status === "publish" ? (
                <>{getRemainingDays(props.raffle.endDate)}</>
              ) : (
                <Chip variant={"bordered"} className={"text-black"}>
                  Ya ha habido un ganador
                </Chip>
              )}
            </p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter
        className={"flex items-center justify-center bg-primary text-white"}
      >
        <Link href={hrefValue}>
          <p className={"text-lg hover:font-extrabold"}>
            {props.raffle.status === "publish" ? "Comprar boletas" : "Ver mas"}
          </p>
        </Link>
      </CardFooter>
    </Card>
  );
}
