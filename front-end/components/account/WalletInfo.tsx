"use client";

import { getExplorerDetails } from "@/lib/utils";
import React from "react";
import { useAccount, useBalance } from "wagmi";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { useToast } from "../ui/use-toast";
import { formatUnits } from "viem";
import Loader from "../shared/Loader";

const WalletInfo = () => {
  const { toast } = useToast();
  const { chainId, address } = useAccount();
  const { data, isLoading } = useBalance({
    address,
  });
  const etherscan = getExplorerDetails(chainId);

  const truncateAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    copy(address || "");
    toast({
      title: "Address copied to clipboard",
      duration: 1000,
    });
  };

  return (
    <div className="flex w-full h-full bg-gradient-to-b from-primary-100 to-primary-base p-1 pt-0 rounded-t-none rounded-[60px]">
      <div className="flex flex-col items-center justify-center space-y-4 w-full h-full bg-primary-100 rounded-t-none rounded-[60px] p-5 ">
        <div className="flex flex-col space-y-1">
          <h2 className="text-neutral-base m-heading text-center">
            My Account
          </h2>
          <p className="text-neutral-base m-body-link text-center">
            {etherscan.name}
          </p>
        </div>
        <Image
          src={`https://api.dicebear.com/9.x/fun-emoji/webp?seed=${address}`}
          width={100}
          height={100}
          alt="wallet"
          className="rounded-full border-4 border-primary-70"
        />
        <p
          onClick={copyAddress}
          className="text-secondary-100 cursor-pointer py-1 px-3 rounded-2xl bg-brand-50 m-body-base text-center"
        >
          {truncateAddress(address)}
        </p>

        <p>
          {isLoading || data === undefined ? (
            <Loader size="20" speed="1.75" color="white" />
          ) : (
            <span className="text-neutral-base m-body-strong">
              {Number(formatUnits(data.value, 18)).toFixed(3)} {data.symbol}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default WalletInfo;
