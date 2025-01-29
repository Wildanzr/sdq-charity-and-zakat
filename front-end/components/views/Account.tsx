"use client";

import Blocker from "@/components/shared/Blocker";
import { useWalletStore } from "@/store/wallet";
import WalletInfo from "@/components/account/WalletInfo";
import NFTList from "../account/NFTList";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { getMyStats } from "@/web3/checkin";
import { soulbounds } from "@/constants/common";
import {
  getCampaignCount,
  getDonationCount,
  soulboundBalaceOf,
} from "@/actions/readWeb3";
import Loader from "../shared/Loader";

const Account = () => {
  const { address, status } = useAccount();
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const [soulboundsBalance, setSoulboundsBalance] = useState<number[]>();
  const [campaignCount, setCampaignCount] = useState<number>(0);
  const [donationCount, setDonationCount] = useState<number>(0);
  const [checkinCount, setCheckinCount] = useState<number>(0);

  const fetchSoulboundsBalance = useCallback(async () => {
    if (address === undefined) return;
    const promises = soulbounds.map(async (item) => {
      const res = await soulboundBalaceOf(item.contract, address);
      return res;
    });
    const result = await Promise.all(promises);
    setSoulboundsBalance(result);
  }, [address]);

  const getCheckinStats = useCallback(async (address: Address | undefined) => {
    const result = await getMyStats(address);
    setCheckinCount(result.consecutiveDays);
  }, []);

  const getCharityStats = useCallback(async (address: Address | undefined) => {
    if (address === undefined) return;
    const [cam, don] = await Promise.all([
      getCampaignCount(address),
      getDonationCount(address),
    ]);
    console.log("cam", cam);
    console.log("don", don);
    setCampaignCount(cam);
    setDonationCount(don);
  }, []);

  useEffect(() => {
    if (isConnected && address !== undefined) {
      getCheckinStats(address);
      getCharityStats(address);
      fetchSoulboundsBalance();
    }
  }, [
    address,
    fetchSoulboundsBalance,
    getCharityStats,
    getCheckinStats,
    isConnected,
    status,
  ]);
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full items-start justify-start min-h-screen">
          <WalletInfo />
          {soulboundsBalance && address !== undefined ? (
            <NFTList
              soulboundsBalance={soulboundsBalance}
              campaignCount={campaignCount}
              donationCount={donationCount}
              checkinCount={checkinCount}
              address={address}
            />
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <Loader />
            </div>
          )}
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default Account;
