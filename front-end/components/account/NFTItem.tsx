"use client";
import {
  mintMyFirstSBT,
  mintMyOneWeekSBT,
  mintMyOneMonthSBT,
} from "@/web3/checkin";

import {
  mintMyFirstDonationSBT,
  mintMyFifthDonationSBT,
  mintMyTenDonationSBT,
  mintMyFiftyDonationSBT,
  mintMyHundredDonationSBT,
  mintMyFirstCampaignSBT,
  mintMyThirdCampaignSBT,
  mintMyTenCampaignSBT,
} from "@/web3/charity";

import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { cn, getExplorer } from "@/lib/utils";
import { Address } from "viem";
import { useToast } from "../ui/use-toast";
import ToastTx from "../shared/ToastTx";
import { useRouter } from "next/navigation";
import useWaitForTxAction from "@/hooks/useWaitForTx";

interface NFTItemProps {
  id: number;
  isObtained: boolean;
  imageSrc: string;
  name: string;
  info: string;
  readyToMint: boolean;
  address: Address;
  className?: string;
}

const NFTItem = ({
  id,
  imageSrc,
  info,
  isObtained,
  readyToMint,
  name,
  address,
  className,
}: NFTItemProps) => {
  const etherscan = getExplorer();
  const { toast } = useToast();
  const router = useRouter();
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const action = () => {
    if (txHash !== undefined) {
      toast({
        title: "Transaction Done",
        action: (
          <ToastTx
            explorerLink={etherscan.url}
            explorerName={etherscan.name}
            txHash={txHash}
          />
        ),
      });

      setTxHash(undefined);
      router.refresh();
    }
  };

  useWaitForTxAction({
    txHash: txHash,
    action: action,
  });
  const minterFunction = [
    mintMyFirstSBT,
    mintMyOneWeekSBT,
    mintMyOneMonthSBT,
    mintMyFirstDonationSBT,
    mintMyFifthDonationSBT,
    mintMyTenDonationSBT,
    mintMyFiftyDonationSBT,
    mintMyHundredDonationSBT,
    mintMyFirstCampaignSBT,
    mintMyThirdCampaignSBT,
    mintMyTenCampaignSBT,
  ];

  const handleMint = async (id: number) => {
    try {
      const txHash = await minterFunction[id](address);
      setTxHash(txHash);
      toast({
        title: "Transaction submitted",
        action: (
          <ToastTx
            explorerLink={etherscan.url}
            explorerName={etherscan.name}
            txHash={txHash}
          />
        ),
      });
    } catch (error: any) {
      console.error("Error in handleDonateNative", error);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to donate",
        variant: "destructive",
      });
    }
  };

  if (readyToMint && !isObtained) {
    // should mint here
    return (
      <button
        onClick={() => handleMint(id)}
        className="flex h-40 w-full relative border border-brand-50 rounded-lg"
      >
        <Image
          src={imageSrc}
          layout="fill"
          className="rounded-lg object-contain cursor-pointer opacity-40"
          alt="Soulbond"
        />
      </button>
    );
  } else if (isObtained) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex h-40 w-full relative">
            <Image
              src={imageSrc}
              layout="fill"
              className="rounded-lg object-contain opacity-100 cursor-pointer"
              alt="Soulbond"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">
                Congrats, you already obtain {name}
              </h4>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex h-40 w-full relative">
            <Image
              src={imageSrc}
              layout="fill"
              className={cn(
                "rounded-lg object-contain opacity-40 cursor-pointer hover:opacity-70",
                className
              )}
              alt={name}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">How to obtain?</h4>
              <p className="text-sm text-muted-foreground">{info}</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
};
export default NFTItem;
