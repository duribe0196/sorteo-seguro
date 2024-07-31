"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import LoginHeader from "@/app/components/server/LoginHeader";

export default function Header() {
  const { data, status } = useSession();
  return (
    <Navbar
      disableAnimation
      isBordered
      className={"lg:flex lg:items-center lg:justify-between shadow-md"}
    >
      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Link href={"/raffles"} className="font-bold text-inherit">
            Sorteo Seguro
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex gap-4" justify="center">
        {status === "authenticated" ? (
          <>
            <LoginHeader user={data?.user} />
            <NavbarItem isActive>
              <Link href="/my-profile" aria-current="page">
                <p className={"text-black hover:text-white"}>
                  Mi cuenta {data?.user?.name}
                </p>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="#"
                aria-current="page"
                color="warning"
                onClick={() => signOut()}
              >
                Cerrar session
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link
                color="foreground"
                href="#"
                onClick={() => signIn("google")}
              >
                Iniciar session
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
