"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";

export default function GoBack() {
  const router = useRouter();
  return (
    <div className="mt-2 items-center text-sm text-gray-500">
      <Link
        href={""}
        onClick={() => router.back()}
        className="hover:bg-gray-50 flex flex-row items-center"
      >
        <IoArrowBackSharp />
        Atras
      </Link>
    </div>
  );
}
