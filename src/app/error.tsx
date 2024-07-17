"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@nextui-org/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={"p-2"}>
      <h2>Lo sentimos, algo falló</h2>
      <Button color={"danger"} onClick={() => reset()}>
        Recargar
      </Button>
    </div>
  );
}
