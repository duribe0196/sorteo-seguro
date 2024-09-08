"use client";

import React from "react";

import { FaCheck } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { MdRocketLaunch } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";
import { SiCashapp } from "react-icons/si";

import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export function PlanDescription(props: any) {
  return (
    <Accordion variant={"shadow"}>
      <AccordionItem
        key="1"
        aria-label={""}
        title={"Comunidad Premium"}
        subtitle={"Una comunidad internacional"}
      >
        <Card>
          <CardHeader className="z-10 top-1 flex-col items-start text-black">
            <p className="font-medium text">
              En nuestra comunidad premium todos compartimos nuestras opiniones
              de cada evento y nos damos consejos.
            </p>
            <p className={"text font-light"}>
              Subscripciones a canales premium son muy costosas y NADIE TE
              ASEGURA GANAR.
            </p>
            <p>
              Tu vas a elegir a los mejores tipsters y sus análisis apareceran
              de primeros, los mejores siempre estarán arriba.
            </p>
            <span
              className={
                "flex items-center justify-around bg-primary text-white p-1 rounded mt-2"
              }
            >
              <Link
                className={"bg-primary text-white p-1 rounded-md"}
                href={props.plan.paymentLink}
              >
                Subscribirme ${props.plan.price.unitAmount}{" "}
                {props.plan.price.currency}
              </Link>
            </span>
            <li className="flex items-center gap-2">
              <IoIosInformationCircle />
              <p className={"text-black font-bold"}>
                1 mes gratis, si no te gusta puedes cancelar cuando quieras.
              </p>
            </li>
          </CardHeader>
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
                  <AiFillLike color={"green"} />
                  <p>Tu escoges a los mejores tipsters</p>
                </li>
                <li className="flex items-center gap-2">
                  <MdRocketLaunch color={"green"} />
                  <p>Los mejores aparecen de primeros</p>
                </li>
                <li className="flex items-center gap-2">
                  <ImStatsDots color={"green"} />
                  <p>
                    Tu puedes compartir tus pronosticos, convertirte en tipster
                    y obtener beneficios
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <SiCashapp color={"green"} />
                  <p>Participa por sorteos completamente gratis</p>
                </li>
              </ul>
            </div>
          </CardFooter>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
