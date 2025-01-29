"use client";

import { navigations } from "@/constants/common";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FootNav = () => {
  const pathname = usePathname();
  const localNavs = navigations.slice(1);

  return (
    <div className="flex flex-col space-y-2">
      {localNavs.map((item, idx) => {
        const isActive =
          (pathname.includes(item.href) && item.href.length > 1) ||
          pathname === item.href;
        return (
          <Link
            key={idx}
            href={item.href}
            className={cn(
              "flex items-center justify-start text-neutral-base gap-4"
            )}
          >
            <p className={`${isActive ? "text-xl" : "text-base"}`}>
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default FootNav;
