"use client";

import React from "react";

import { FaCheck } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function PlanDescription() {
  const router = useRouter();
  return (
    <div className={"mx-auto"}>
      <Card>
        <CardHeader className="z-10 top-1 flex-col items-start text-black">
          <h4 className="text-white/90 font-medium text-xl">
            Nosotros recolectamos y analizamos los mejores pronosticos, tu
            decides en que apostar
          </h4>
          <p className={"text-tiny"}>
            Subscripciones a canales premium son muy costosas, con nosotros ya
            no es más asi, aparte mes a mes participaras en nuestras rifas, y si
            nadie gana, se vuelve a jugar y tus boletas siguen estando vigentes.
          </p>
          <span
            className={
              "flex items-center justify-around bg-primary p-1 rounded"
            }
          >
            Precio mensual
            <Chip className={"text-white"} color={"primary"}>
              $5.000
            </Chip>
          </span>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0"
          src="advices.png"
          shadow={"lg"}
        />

        <CardFooter className="bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <ul className="mt-2 space-y-1">
              <li className="flex items-center gap-2">
                <FaCheck color={"green"} />
                <p className={"text-black font-bold"}>
                  Analisis deportivos diarios
                </p>
              </li>
              <li className="flex items-center gap-2">
                <FaCheck color={"green"} />
                <p>Boletas GRATIS TODOS LOS MESES</p>
              </li>
              <li className="flex items-center gap-2">
                <FaCheck color={"green"} />
                <p>Las boletas son acumulables</p>
              </li>
              <li className="flex items-center gap-2">
                <FaCheck color={"green"} />
                <p>Tu escoges tus boletas</p>
              </li>
            </ul>
          </div>
          <Button
            radius="full"
            size="md"
            color={"primary"}
            className={"text-white"}
          >
            <Link href={"advices/subscribe"}>Subscribirme</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
