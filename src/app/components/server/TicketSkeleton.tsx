import React from "react";

const TicketSkeleton = () => {
  return (
    <div className={"my-10 mt-10"}>
      <h3 className="text-base font-semibold leading-7 text-gray-900">
        Boletas
      </h3>
      <span className={"px-4 sm:px-0 "}>Cargando Boletas...</span>
    </div>
  );
};

export default TicketSkeleton;
