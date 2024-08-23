"use server";

import dayjs from "dayjs";
import "dayjs/locale/es";

import { getPublicAdvices } from "@/lib/actions/advices";

dayjs.locale("es");

export async function ListPublicAdvices(props: any) {
  const advices = await getPublicAdvices();

  return (
    <div className={"px-4 sm:px-0"}>
      {!advices.length ? (
        <div className="px-4 sm:px-0 my-10">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            No apuestas recolectadas
          </h3>
        </div>
      ) : null}
    </div>
  );
}
