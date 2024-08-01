import { useState } from "react";
import { Input } from "@nextui-org/input";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { Button } from "@nextui-org/button";
import { createWinnerActivity } from "@/lib/actions/activities";
import { MailIcon } from "@nextui-org/shared-icons";

export default function CreateWinnerActivity(props: any) {
  const [ticketPlayed, setTicketPlayed] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const sendCreateWinnerActivity = async (formData: FormData) => {
    setErrorMessage("");
    const email = formData.get("email")!.toString();
    const playedNumber = formData.get("playedNumber")!.toString();
    const response = await createWinnerActivity({
      email: email,
      ticketPlayed: playedNumber,
      raffleId: props.raffle._id,
    });
    if (response.fail) {
      setErrorMessage(response.message);
    }
    if (response.success) {
      props.onClose();
    }
    setIsSaving(false);
  };

  return (
    <form
      className={"flex flex-col gap-2"}
      onSubmit={() => {
        setIsSaving(true);
      }}
      action={sendCreateWinnerActivity}
    >
      <Input
        name={"email"}
        id={"email"}
        type="email"
        label="Selecciona al ganador"
        placeholder="correo electronico"
        labelPlacement="outside"
        startContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      <Input
        type="text"
        label="Número jugado"
        name={"playedNumber"}
        id={"playedNumber"}
        placeholder="Número"
        labelPlacement="outside"
        startContent={
          <AiOutlineFieldNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        value={ticketPlayed}
        onChange={(e) => setTicketPlayed(e.target.value)}
      />

      <Button
        className={"text-black font-bold"}
        color="secondary"
        type={"submit"}
        isLoading={isSaving}
      >
        Finalizar sorteo CON GANADOR
      </Button>
      <div>
        <p className={"p-5 flex text-danger"}>{errorMessage}</p>
      </div>
    </form>
  );
}
