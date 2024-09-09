"use client";

import { AiOutlineLoading } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getUserSubscription } from "@/lib/actions/users";
import { useRouter } from "next/navigation";

export default function PoolPaymentResults() {
  const [status, setStatus] = useState("checking");
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const subscription = await getUserSubscription();
      if (subscription) setStatus(subscription);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (status === "active") {
      setTimeout(() => {
        router.replace("premium");
      }, 2000);
    }
  }, [status]);

  return (
    <div>
      {status === "checking" && (
        <p>
          Estamos verificando tu subscripción ....{" "}
          <AiOutlineLoading className="spin" />
        </p>
      )}
      {status === "active" && (
        <p>¡Ya eres de la comunidad premium! Redirigiendo...</p>
      )}
    </div>
  );
}
