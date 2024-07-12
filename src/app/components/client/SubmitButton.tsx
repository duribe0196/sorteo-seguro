"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/button";

type SubmitButtonProps = {
  text: string;
  pendingText: string;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { text, pendingText } = props;
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? pendingText : text}
    </Button>
  );
}
