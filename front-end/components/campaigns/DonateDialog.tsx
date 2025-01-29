"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormDonation from "./FormDonation";
import { useAccount, useBalance } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { getAvailableTokens } from "@/actions/readWeb3";
import { getTokenBalance } from "@/web3/token";
import { CHARITY_ADDRESS, tokenIcon } from "@/constants/common";
import Loader from "../shared/Loader";
import { getCoinLatestPrice } from "@/actions/coingecko";
import { cn } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet";

interface DonateDialogProps {
  id: number;
  title: string;
  claimed: boolean;
  paused: boolean;
}

const DonateDialog = ({ id, title, claimed, paused }: DonateDialogProps) => {
  const { address } = useAccount();
  const { data: nativeBalance, isLoading } = useBalance({
    address,
  });
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const [nativePrice, setNativePrice] = useState<number | undefined>();
  const [availableTokens, setAvailableTokens] = useState<
    AvailableTokens | undefined
  >();
  const [walletBalance, setWalletBalance] = useState<
    TokenBalance[] | undefined
  >();

  const fetchAvailableTokens = useCallback(async () => {
    const result = (await getAvailableTokens()) as AvailableTokens;
    setAvailableTokens(result);
  }, []);

  const fetchWalletBalance = useCallback(async () => {
    if (!availableTokens || !availableTokens.address) return;

    const balances: TokenBalance[] = [];
    for (const token of availableTokens.address) {
      const balance = await getTokenBalance(token, address!, CHARITY_ADDRESS);
      balances.push(balance);
    }
    setWalletBalance(balances);
  }, [address, availableTokens]);

  const fetchNativePrice = useCallback(async () => {
    const result = await getCoinLatestPrice("islamic-coin");
    setNativePrice(result);
  }, []);

  useEffect(() => {
    fetchAvailableTokens();
    fetchNativePrice();
  }, [id, fetchAvailableTokens, fetchNativePrice]);

  useEffect(() => {
    if (availableTokens && address !== undefined && isConnected) {
      fetchWalletBalance();
    }
  }, [address, availableTokens, fetchWalletBalance, isConnected]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={paused || claimed || !isConnected}
          className={cn(
            "flex w-full flex-row space-x-3 text-neutral-base z-10 bg-primary-100 border border-brand-base rounded-lg p-2",
            paused || claimed ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          <p className="m-body-base">
            {claimed
              ? "Campaign done"
              : paused
              ? "Campaign paused"
              : !isConnected
              ? "Oops! Connect Wallet"
              : "Donate Now"}
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-sm bg-primary-100 border border-primary-90 rounded-2xl">
        <DialogHeader className="flex flex-col items-start justify-start text-neutral-base">
          <DialogTitle>Donate to</DialogTitle>
          <DialogDescription className="m-body-base">{title}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ||
          availableTokens === undefined ||
          nativePrice === undefined ||
          nativeBalance === undefined ||
          walletBalance === undefined ? (
            <Loader />
          ) : (
            <FormDonation
              id={id}
              availableTokens={availableTokens}
              balances={walletBalance}
              nativeAmount={nativeBalance.value}
              nativeBalance={{
                address: ["0x0000000000000000000000000000000000000000"],
                coinIds: ["native"],
                decimals: [18],
                icon: [tokenIcon[0].image],
                price: [nativePrice],
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonateDialog;
