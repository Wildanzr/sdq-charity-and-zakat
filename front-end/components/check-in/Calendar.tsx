"use client";

import { checkIn } from "@/web3/checkin";
import type { GetMyStatsResponse } from "@/web3/checkin";
import React, { useState } from "react";
import { Address, formatUnits } from "viem";
import { useAccount } from "wagmi";
import Item from "./Item";
import { checkInLists } from "@/constants/common";
import { Button } from "../ui/button";
import emoji from "react-easy-emoji";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExplorerDetails, isAlreadyClaimed } from "@/lib/utils";
import useWaitForTxAction from "@/hooks/useWaitForTx";
import { useToast } from "../ui/use-toast";
import ToastTx from "../shared/ToastTx";
import Loader from "../shared/Loader";

interface CalendarProps {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  stats: GetMyStatsResponse | null;
}

const Calendar = ({ setRefetch, stats }: CalendarProps) => {
  const { toast } = useToast();
  const { chainId } = useAccount();
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const [disabledButton, setDisabledButton] = useState(false);
  const [loadingTx, setLoadingTx] = useState(false);
  const etherscan = getExplorerDetails(chainId);

  const action = () => {
    if (txHash !== undefined) {
      toast({
        title: "Transaction Done",
        action: (
          <ToastTx
            explorerLink={etherscan.blockExplorers.default.url}
            explorerName={etherscan.blockExplorers.default.name}
            txHash={txHash}
          />
        ),
      });
      console.log("Tx Done");
      setTxHash(undefined);
      setLoadingTx(false);
      setDisabledButton(false);
      setRefetch(true);
    }
  };

  useWaitForTxAction({
    txHash: txHash,
    action: action,
  });

  const handleCheckIn = async () => {
    try {
      setLoadingTx(true);
      setDisabledButton(true);
      const res = await checkIn();
      setTxHash(res);
      toast({
        title: "Transaction submitted",
        action: (
          <ToastTx
            explorerLink={etherscan.blockExplorers.default.url}
            explorerName={etherscan.blockExplorers.default.name}
            txHash={res}
          />
        ),
      });
    } catch (error: any) {
      console.error("Error in handleCheckIn", error);
      setLoadingTx(false);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to claim",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {stats !== null && (
        <Card className="w-full bg-secondary-100/50 rounded-xl border-primary-90">
          <CardHeader>
            <CardTitle className="flex flex-col space-y-5 w-full ">
              <h2 className="text-center text-neutral-base m-title-page">
                Daily Check In
              </h2>
              <div className="flex flex-row space-x-2 items-center justify-center">
                <p className="m-body-base text-neutral-base">Total claimed:</p>
                <p className="m-body-base text-neutral-base py-2 px-3 rounded-2xl bg-gradient-to-r from-brand-70 to-secondary-70">
                  {formatUnits(stats.totalClaimed, 18).toString()} SDQ
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-5 p-2">
              {checkInLists.map((item, idx) => (
                <Item
                  key={idx}
                  amount={item.amount}
                  currentDay={stats.consecutiveDays + 1}
                  day={item.day}
                  image={item.image}
                  className={item.day === 7 ? "col-span-3" : ""}
                />
              ))}

              <Button
                onClick={handleCheckIn}
                disabled={isAlreadyClaimed(stats.lastClaimed) || disabledButton}
                className="flex h-16 flex-row items-center space-x-2 justify-center col-span-3 bg-gradient-to-r from-brand-60 to-secondary-base rounded-3xl"
              >
                {loadingTx ? (
                  <Loader />
                ) : (
                  <>
                    <p className="m-body-strong text-neutral-base">
                      {isAlreadyClaimed(stats.lastClaimed)
                        ? "Claimed "
                        : `Claim `}
                    </p>
                    <p className="m-body-strong text-neutral-base">
                      {isAlreadyClaimed(stats.lastClaimed)
                        ? emoji("🔐")
                        : emoji("✨")}
                    </p>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Calendar;
