import Link from "next/link";
import React from "react";
import Image from "next/image";
import FootNav from "./FootNav";
import { footerNavigations, sponsors } from "@/constants/common";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5 py-10 px-5">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/icon.svg" width={30} height={30} alt="Haqq Wallet" />

        <p className="pl-1 font-ubuntu text-2xl text-brand-base">
          SDQ
          <span className="text-neutral-base pl-1">Charity</span>
        </p>
      </Link>
      <p className="m-body-base text-neutral-base">
        Building a Better World with Charity and Web3
      </p>

      <div className="flex flex-row space-x-5 items-start justify-between w-full h-full">
        <FootNav />
        <div className="flex flex-col space-y-2">
          {footerNavigations.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "flex items-center justify-start text-neutral-base gap-4"
              )}
            >
              <p className={"text-base"}>{item.label}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-row space-x-3 items-center justify-center w-full">
        {sponsors.map((item, idx) => (
          <Link key={idx} href={item.url} target="_blank">
            <Image
              key={idx}
              src={item.image}
              width={idx === 3 ? 30 : 60}
              height={idx === 3 ? 40 : 20}
              alt={item.name}
              className={cn("", item.cls)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
