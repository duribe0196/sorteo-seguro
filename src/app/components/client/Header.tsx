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

export default function Header(props: any) {
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
        <NavbarBrand className={"flex gap-4"}>
          <NavbarItem>
            <Link href={"/raffles"}>Sorteos</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/advices">Comunidad gratuita</Link>
          </NavbarItem>
          {props.subscription === "active" ? (
            <NavbarItem>
              <Link href="/premium">Comunidad premium</Link>
            </NavbarItem>
          ) : null}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex gap-4" justify="end">
        {status === "authenticated" ? (
          <>
            <LoginHeader user={data?.user} />
            <NavbarItem>
              <Link href="/my-profile" aria-current="page">
                Mi perfil - {data?.user.name}
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
