"use client";
import { Input } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { saveReferral } from "@/lib/actions/users";

export function SaveReferralForm() {
  // const [state, formAction] = useFormState(saveReferral, {
  //   message: "",
  //   error: "",
  // });

  return (
    <form
      // action={formAction}
      className="flex w-1/3 flex-wrap md:flex-nowrap gap-4"
    >
      <Input
        className={"w-1/2"}
        type="referedEmail"
        label="¿Has sido referido por alguien?"
        placeholder="Correo electronico"
      />
    </form>
  );
}
