"use client";

import { Button } from "@nextui-org/button";
import { useRouter, usePathname } from "next/navigation";

export default function GoTo(props: any) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Button
      className={"text-black w-1/2 mt-2"}
      color={"primary"}
      endContent={props.endContent}
      onClick={() => router.push(`${pathName}/${props.goTo}`)}
    >
      {props.text}
    </Button>
  );
}
