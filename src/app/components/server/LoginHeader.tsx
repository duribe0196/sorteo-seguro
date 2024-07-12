import Link from "next/link";
import GoBack from "@/app/components/client/GoBack";
import { NavbarItem } from "@nextui-org/navbar";

export default function LoginHeader() {
  return (
    <>
      <NavbarItem>
        <Link href="/my-profile/raffles" aria-current="page" color="warning">
          Mis sorteos
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/my-profile/new-raffle" aria-current="page" color="warning">
          Crear nuevo sorteo
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/my-profile/referrals" aria-current="page" color="warning">
          Referidos
        </Link>
      </NavbarItem>
    </>
  );
}
