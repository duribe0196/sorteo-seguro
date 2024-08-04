"use client";

import Link from "next/link";
import { NavbarItem } from "@nextui-org/navbar";

export default function LoginHeader(props: any) {
  return (
    <>
      <NavbarItem>
        <Link href="/my-profile/referrals" aria-current="page" color="warning">
          Referidos
        </Link>
      </NavbarItem>
    </>
  );
}
