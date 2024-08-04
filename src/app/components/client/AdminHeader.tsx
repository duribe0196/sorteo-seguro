"use client";

import { useSession } from "next-auth/react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";

export default function AdminHeader() {
  const { data, status } = useSession();
  return (
    <Navbar>
      {data?.user.role === "admin" ? (
        <NavbarContent justify="end">
          <>
            <NavbarItem>
              <Link href="/admin/raffles/new" aria-current="page">
                Crear nuevo sorteo
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/admin/raffles" aria-current="page">
                Manejar sorteos
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/admin/subscriptions" aria-current="page">
                Manejar subscripciones
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/admin/advices" aria-current="page">
                Manejar apuestas deportivas
              </Link>
            </NavbarItem>
          </>
        </NavbarContent>
      ) : null}
    </Navbar>
  );
}
