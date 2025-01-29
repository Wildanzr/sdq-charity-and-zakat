"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaRegCirclePause, FaRegCirclePlay, FaPencil } from "react-icons/fa6";
import { useToast } from "../ui/use-toast";
import {
  pauseCampaign,
  unPauseCampaign,
  withdrawCampaign,
} from "@/web3/charity";
import { Address } from "viem";
import { getExplorer } from "@/lib/utils";
import ToastTx from "../shared/ToastTx";
import useWaitForTxAction from "@/hooks/useWaitForTx";
import Loader from "../shared/Loader";
import Link from "next/link";
import WithdrawDialog from "./WithdrawDialog";

interface ManagementProps {
  id: number;
  claimed: boolean;
  setClaimed: (claimed: boolean) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
}

const Management = ({
  id,
  claimed,
  paused,
  setClaimed,
  setPaused,
}: ManagementProps) => {
  const etherscan = getExplorer();
  const { toast } = useToast();
  const [disabledButton, setDisabledButton] = useState(false);
  const [txHash, setTxHash] = useState<Address | undefined>(undefined);
  const [state, setState] = useState<
    "paused" | "unpaused" | "withdraw" | "withdrawn"
  >(claimed ? "withdrawn" : paused ? "paused" : "unpaused");

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
      setDisabledButton(false);

      if (state === "paused") {
        setState("unpaused");
        setPaused(true);
        console.log("Unpaused");
      }
      if (state === "unpaused") {
        setState("paused");
        setPaused(false);
        console.log("Paused");
      }
      if (state === "withdraw") {
        setState("withdrawn");
        setClaimed(true);
        console.log("Withdrawn");
      }
    }
  };

  useWaitForTxAction({
    action: action,
    txHash: txHash,
  });

  const handlePauseUnPause = async () => {
    setDisabledButton(true);
    if (paused) {
      await handleUnPause();
    } else {
      await handlePause();
    }
  };

  const handlePause = async () => {
    try {
      setState("paused");
      console.log("Paused");
      const txHash = await pauseCampaign(id);
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
      console.error(error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to donate",
        variant: "destructive",
      });
    }
  };

  const handleUnPause = async () => {
    try {
      setState("unpaused");
      console.log("UnPaused");
      const txHash = await unPauseCampaign(id);
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
      console.error(error);
      console.error(error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to donate",
        variant: "destructive",
      });
    }
  };

  const handleWithdraw = async () => {
    setDisabledButton(true);
    try {
      setState("withdraw");
      const txHash = await withdrawCampaign(id);
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
      console.error(error);
      setDisabledButton(false);
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to withdraw",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-5 w-full h-full items-center justify-center">
      <div className="flex flex-row w-full h-full items-center justify-center space-x-5">
        <Button
          disabled={claimed || disabledButton}
          onClick={handlePauseUnPause}
          className="flex w-full flex-row space-x-2 z-10 bg-primary-100 border border-neutral-base rounded-lg p-2"
        >
          {paused && state === "unpaused" ? (
            <>
              {disabledButton ? (
                <Loader size="20" />
              ) : (
                <FaRegCirclePlay className="text-neutral-base" size={20} />
              )}
              <p className="m-body-base text-neutral-base">Unpause Campaign</p>
            </>
          ) : (
            <>
              {disabledButton && state === "paused" ? (
                <Loader size="20" />
              ) : (
                <FaRegCirclePause className="text-neutral-base" size={20} />
              )}
              <p className="m-body-base text-neutral-base">Pause Campaign</p>
            </>
          )}
        </Button>
        <Link href={`/my-campaigns/${id}/edit`} className="flex w-full">
          <Button
            disabled={disabledButton}
            className="flex w-full flex-row space-x-2 z-10 bg-primary-100 border border-neutral-base rounded-lg p-2"
          >
            <FaPencil className="text-neutral-base" size={20} />
            <p className="m-body-base text-neutral-base">Edit Campaign</p>
          </Button>
        </Link>
      </div>
      <WithdrawDialog
        claimed={claimed}
        disabledButton={disabledButton}
        handleWithdraw={handleWithdraw}
        state={state}
      />
    </div>
  );
};

export default Management;
