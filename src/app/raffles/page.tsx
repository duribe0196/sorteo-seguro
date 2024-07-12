import { ListPublicRaffles } from "@/app/components/server/ListPublicRaffles";
import { Suspense } from "react";

export default async function Raffles() {
  return (
    <div className={"p-2"}>
      <div className="px-4 sm:px-0 my-10 mt-2">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Sorteos Públicos
        </h2>
      </div>

      <Suspense fallback={<span>Cargando sorteos...</span>}>
        <ListPublicRaffles />
      </Suspense>
    </div>
  );
}
