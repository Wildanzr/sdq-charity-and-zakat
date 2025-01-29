"use client";

import { navigations } from "@/constants/common";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BigNav = () => {
  const pathname = usePathname();

  return (
    <>
      {navigations.map((item, idx) => {
        const isActive =
          (pathname.includes(item.href) && item.href.length > 1) ||
          pathname === item.href;

        return (
          <Link
            key={idx}
            href={item.href}
            className={`${
              isActive
                ? "text-brand-base font-semibold text-xl"
                : "text-neutral-base font-light text-base"
            } flex items-center justify-start p-3`}
          >
            <p>{item.label}</p>
          </Link>
        );
      })}
    </>
  );
};

export default BigNav;
