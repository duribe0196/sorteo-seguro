import GetPlans from "@/app/components/server/GetPlans";
import { Suspense } from "react";

export default async function HandlePlansPage() {
  return (
    <div className={"p-2"}>
      <div className="px-4 sm:px-0 my-10">
        <h2 className={"text-black"}>Planes</h2>
      </div>
      <Suspense fallback={<div>Cargando planes...</div>}>
        <GetPlans />
      </Suspense>
    </div>
  );
}
