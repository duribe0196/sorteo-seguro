"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/button";

export function SigninGoogleButton() {
  return (
    <Button
      color="default"
      variant={"bordered"}
      endContent={<FcGoogle size={20} />}
      onClick={() => signIn("google")}
    >
      Inicia sesión
    </Button>
  );
}
