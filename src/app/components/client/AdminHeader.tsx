"use client";

import { useSession } from "next-auth/react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";

export default function AdminHeader() {
  const { data, status } = useSession();
  return (
    <Navbar>
      {status === "authenticated" && data?.user.role === "admin" ? (
        <NavbarContent justify="end">
          <>
            <NavbarItem>
              <Link href="/admin/raffles/new" aria-current="page">
                Crear nuevo sorteo
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/admin/raffles" aria-current="page">
                Sorteos
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/admin/plans" aria-current="page">
                Planes
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/admin/users" aria-current="page">
                Usuarios
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/admin/advices" aria-current="page">
                Asesoramiento deportivo
              </Link>
            </NavbarItem>
          </>
        </NavbarContent>
      ) : null}
    </Navbar>
  );
}
