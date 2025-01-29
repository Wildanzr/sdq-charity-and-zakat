"use client";

import Blocker from "@/components/shared/Blocker";
import { useWalletStore } from "@/store/wallet";
import AccessItem from "@/components/special-access/AccessItem";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import {
  CHARITY_ADDRESS,
  CHECK_IN_ADDRESS,
  SHODAQO_ADDRESS,
} from "@/constants/common";
import { useCallback, useEffect, useState } from "react";
import { getTokenBalance, tranferToBuyAccess } from "@/web3/token";
import Image from "next/image";
import { Address, formatUnits } from "viem";
import { useToast } from "../ui/use-toast";
import { claimSpecialAccess } from "@/actions/access";
import { useRouter } from "next/navigation";
import { getExplorer } from "@/lib/utils";
import ToastTx from "../shared/ToastTx";
import useWaitForTxAction from "@/hooks/useWaitForTx";

interface SpecialAccessDetailsProps {
  access: Access;
}

const SpecialAccessDetails = ({ access }: SpecialAccessDetailsProps) => {
  const etherscan = getExplorer();
  const { toast } = useToast();
  const router = useRouter();
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const { address } = useAccount();
  const [disabledButton, setDisabledButton] = useState(false);
  const [walletBalance, setWalletBalance] = useState<
    TokenBalance | undefined
  >();
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);

  const action = async () => {
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
      const res = (await claimSpecialAccess(access._id, address!)) as string;
      console.log("res", JSON.parse(res));
      setTimeout(() => {
        router.refresh();
      }, 2000);
    }
  };

  useWaitForTxAction({
    txHash: txHash,
    action: action,
  });

  const handleClaim = async () => {
    setDisabledButton(true);
    try {
      const txHash = await tranferToBuyAccess(CHECK_IN_ADDRESS, access.price);
      setTxHash(txHash);
      toast({
        title: "Transaction successful",
        description: "You have successfully claimed the special access",
        variant: "default",
      });

      setDisabledButton(false);
    } catch (error: any) {
      console.error("Error claiming special access", error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to donate",
        variant: "destructive",
      });
    }
  };

  const fetchWalletBalance = useCallback(async () => {
    const balance = await getTokenBalance(
      SHODAQO_ADDRESS,
      address!,
      CHARITY_ADDRESS
    );
    console.log("Balance", balance);
    setWalletBalance(balance);
  }, [address]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address, fetchWalletBalance]);
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full items-start justify-start min-h-screen">
          <div className="flex flex-col w-full h-full">
            {walletBalance !== undefined && (
              <div className="flex  w-full items-center justify-end text-neutral-base ">
                <p className="m-body-base">Your Balance:</p>
                <div className="flex flex-row space-x-2 py-1 px-2 rounded-l-lg">
                  <Image
                    src="/coins/twemoji_coin-1.svg"
                    alt="Coin"
                    width={20}
                    height={20}
                  />
                  <p className="font-medium mb-0">
                    {formatUnits(walletBalance.value, 18)}
                  </p>
                </div>
              </div>
            )}
            <AccessItem
              id={access._id}
              image={access.image}
              price={access.price}
              sold={access.sold}
              total={access.total}
              title={access.title}
              className="rounded-none border-0"
            />
          </div>

          <div className="flex flex-col w-full h-full items-start justify-start p-5 space-y-5">
            <h1 className="m-heading text-neutral-base">{access.title}</h1>
            <p className="text-neutral-base m-body-small">{access.details}</p>

            {address !== undefined && access.claimers.includes(address) && (
              <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
                <h1 className="m-heading text-neutral-base">Content</h1>
                <p className="text-neutral-base m-body-small">
                  {access.privateContent}
                </p>
              </div>
            )}
            {walletBalance !== undefined && address !== undefined && (
              <Button
                onClick={handleClaim}
                disabled={
                  Number(formatUnits(walletBalance.value, 18)) < access.price ||
                  disabledButton ||
                  access.claimers.includes(address)
                }
                className="flex w-full flex-row items-center space-x-2 justify-center col-span-3 bg-gradient-to-r from-brand-60 to-secondary-base rounded-lg"
              >
                {disabledButton
                  ? "Processing..."
                  : access.claimers.includes(address)
                  ? "Claimed"
                  : Number(formatUnits(walletBalance.value, 18)) < access.price
                  ? "Insufficient Balance"
                  : `Claim for ${access.price} SDQ`}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default SpecialAccessDetails;
