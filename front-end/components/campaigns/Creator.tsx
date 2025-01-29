import { getExplorer, truncateAddress } from "@/lib/utils";
import React from "react";
import { MdOutlineVerified } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

interface CreatorProps {
  address: string;
  verified?: boolean;
}

const Creator = ({ address, verified }: CreatorProps) => {
  const etherscan = getExplorer();

  return (
    <div className="flex flex-col w-full h-full pt-3">
      <Link
        target="_blank"
        href={`${etherscan.url}/address/${address}`}
        className="flex flex-row space-x-3 w-full h-full items-center justify-start"
      >
        <Image
          src={`https://api.dicebear.com/9.x/fun-emoji/webp?seed=${address}`}
          width={50}
          height={50}
          alt="wallet"
          className="rounded-full border-4 border-primary-90"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="text-neutral-base/50 m-body-base">by</p>
          <div className="flex flex-row space-x-3 items-center justify-center">
            <p className="text-neutral-base m-body-base ">
              {truncateAddress(address)}
            </p>
            {verified && <MdOutlineVerified className="text-brand-base" />}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Creator;
