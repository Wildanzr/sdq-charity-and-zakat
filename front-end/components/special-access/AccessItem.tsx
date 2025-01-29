import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AccessItemProps {
  id: string;
  image: string;
  title: string;
  price: number;
  total: number;
  sold: number;
  className?: string;
}

const AccessItem = ({
  id,
  image,
  price,
  sold,
  title,
  total,
  className,
}: AccessItemProps) => {
  const isSoldOut = total - sold === 0;
  return (
    <Link
      href={isSoldOut ? "#" : `/loyalty-program/special-access/${id}`}
      className={cn(
        "relative flex flex-col w-full h-48 items-center justify-between bg-primary-100 border border-brand-90 rounded-lg",
        className
      )}
    >
      <div
        className={cn("absolute inset-0 rounded-lg", className)}
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
          opacity: 0.5,
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative flex flex-col w-full h-full z-10">
        <div className="flex absolute inset-0 items-center justify-center">
          <p className="m-body-strong text-neutral-base text-center">{title}</p>
        </div>
        <div className="flex w-full items-start justify-start mt-2">
          <p className="m-body-link text-neutral-base bg-primary-80 p-1 px-2 rounded-r-3xl">
            {isSoldOut ? "Sold Out" : "Available"}
          </p>
        </div>
        <div className="flex w-full items-start justify-between p-3 mt-auto">
          <div className="flex flex-row space-x-2 text-neutral-base bg-primary-80/80 py-1 px-2 rounded-lg">
            <Image
              src="/coins/twemoji_coin-1.svg"
              alt="Coin"
              width={20}
              height={20}
            />
            <p className="font-medium mb-0">{price}</p>
          </div>
          <p className="m-body-base text-neutral-base">
            <span className="text-neutral-base/80">{sold}</span> / {total}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AccessItem;
