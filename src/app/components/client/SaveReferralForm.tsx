"use client";
import { Input } from "@nextui-org/input";
import { saveReferral } from "@/lib/actions/users";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@nextui-org/button";

export function SaveReferralForm() {
  const { data } = useSession();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const saveReferralClient = async (referrerEmail: string) => {
    const referralEmail = data?.user.email!;
    const response = await saveReferral(referrerEmail, referralEmail);
    setErrorMessage("");
    if (response.fail) {
      setErrorMessage(response.message);
    }
    setIsSaving(false);
  };

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const referrerEmail = formData.get("referrerEmail")!.toString();
          await saveReferralClient(referrerEmail);
        }}
        onSubmit={() => {
          setIsSaving(true);
        }}
      >
        <div className={""}>
          <div className={"flex w-full flex-row"}>
            <Input
              type="referedEmail"
              id="referrerEmail"
              name="referrerEmail"
              labelPlacement={"outside"}
              label="¿Has sido referido por alguien?"
              placeholder="Correo electronico"
              required={true}
            />
          </div>
          <div className={"flex w-full flex-row mt-2"}>
            <Button
              type={"submit"}
              color={"secondary"}
              className={"text-white"}
              isLoading={isSaving}
            >
              Guardar
            </Button>
          </div>
        </div>

        <div className={"mt-2"}>
          <p className={"p-5 flex text-danger"}>{errorMessage}</p>
        </div>
      </form>
    </div>
  );
}
