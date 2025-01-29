"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import Jumbotron from "../loyalty-program/Jumbotron";

const LoyaltyProgram = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full">
          <Jumbotron />
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default LoyaltyProgram;
