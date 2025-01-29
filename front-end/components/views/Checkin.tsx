"use client";

import { checkInProducts } from "@/constants/common";
import Calendar from "@/components/check-in/Calendar";
import React, { useEffect, useState } from "react";
import Blocker from "@/components/shared/Blocker";
import Product from "@/components/shared/Product";
import { useWalletStore } from "@/store/wallet";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { getMyStats, GetMyStatsResponse } from "@/web3/checkin";

const Checkin = () => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const { address, status } = useAccount();
  const [refetch, setRefetch] = useState(false);
  const [stats, setStats] = useState<GetMyStatsResponse | null>(null);

  useEffect(() => {
    const getStats = async (address: Address | undefined) => {
      const result = await getMyStats(address);
      setStats(result);
      setRefetch(false);
    };

    if ((isConnected && status === "connected") || refetch) {
      getStats(address);
    } else {
      setStats(null);
      console.log("No need to check");
    }
  }, [address, isConnected, refetch, status]);

  return (
    <>
      {isConnected ? (
        <>
          <Calendar setRefetch={setRefetch} stats={stats} />
          <h2 className="text-neutral-base m-title-page">
            Benefit of Check In
          </h2>
          <div className="flex flex-col space-y-3 w-full h-full items-center justify-center">
            {checkInProducts.map((item, idx) => (
              <Product
                key={idx}
                description={item.description}
                image={item.image}
                label={item.label}
              />
            ))}
          </div>
        </>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default Checkin;
