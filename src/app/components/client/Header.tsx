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
      className={
        "lg:flex lg:justify-between shadow-md md:flex-col  sm:flex-col"
      }
    >
      <NavbarContent className="pr-3" justify="start">
        <NavbarBrand>
          <Link href={"/raffles"} className="font-bold text-inherit">
            Sorteos
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link href="/advices" aria-current="page">
            <p className={"text-black hover:text-white"}>Apuestas deportivas</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:flex gap-4" justify="end">
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
