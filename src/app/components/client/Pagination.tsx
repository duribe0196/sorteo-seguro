"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { Chip } from "@nextui-org/chip";

export default function Pagination(props: any) {
  const router = useRouter();
  const pathName = usePathname();

  const renderPageButtons = () => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(props.totalPages); i++) {
      pages.push(
        <button
          key={i}
          className={`px-4 py-2 rounded-md ${
            i === props.page
              ? "bg-blue-500 text-black"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => router.push(`${pathName}?page=${i}`)}
        >
          <Chip
            color={i === props.page ? "primary" : "default"}
            className={"text-white"}
          >
            {i}
          </Chip>
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        className="px-2 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        onClick={() => router.push(`${pathName}?page=${props.page - 1}`)}
        disabled={props.page <= 1}
      >
        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <div className="flex overflow-x-auto space-x-2 flex-nowrap">
        {renderPageButtons()}
      </div>
      <button
        className="px-2 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
        onClick={() => router.push(`${pathName}?page=${props.page + 1}`)}
        disabled={props.page >= Math.ceil(props.totalPages)}
      >
        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
