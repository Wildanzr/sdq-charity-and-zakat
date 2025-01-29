"use client";

import { useWalletStore } from "@/store/wallet";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const Connect = () => {
  const { status } = useAccount();
  const { setIsConnected } = useWalletStore((state) => ({
    setIsConnected: state.setIsConnected,
  }));

  useEffect(() => {
    console.log("Status", status);
    if (status === "disconnected") setIsConnected(false);
    if (status === "connected") setIsConnected(true);
  }, [status, setIsConnected]);
  return <ConnectButton />;
};

export default Connect;
