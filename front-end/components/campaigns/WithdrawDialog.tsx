"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaGetPocket } from "react-icons/fa6";
import { Button } from "../ui/button";
import Loader from "../shared/Loader";

interface WithdrawDialogProps {
  claimed: boolean;
  disabledButton: boolean;
  handleWithdraw: () => Promise<void>;
  state: "paused" | "unpaused" | "withdraw" | "withdrawn";
}

const WithdrawDialog = ({
  claimed,
  disabledButton,
  handleWithdraw,
  state,
}: WithdrawDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex">
        <Button
          disabled={claimed || disabledButton}
          className="flex w-full flex-row space-x-2 z-10 bg-primary-100 border border-brand-base rounded-lg p-2"
        >
          {disabledButton && state === "withdraw" ? (
            <Loader size="20" />
          ) : (
            <FaGetPocket className="text-neutral-base" size={20} />
          )}
          <p className="m-body-base text-neutral-base">
            {claimed ? "Withdrawn" : "Withdraw"}
          </p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-primary-100 border border-brand-base rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-neutral-base">
            Are you sure to withdraw the funds from this campaign?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is will mark the campaign as claimed and the funds will
            be transferred to your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary-100 border border-neutral-base rounded-lg text-neutral-base">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-100 border border-brand-base rounded-lg text-neutral-base"
            onClick={handleWithdraw}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawDialog;
