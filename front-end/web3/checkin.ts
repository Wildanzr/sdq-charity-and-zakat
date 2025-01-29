import { readContract, writeContract } from "@wagmi/core";
import { checkinAbi } from "@/constants/abis/checkin";
import { CHECK_IN_ADDRESS } from "@/constants/common";
import { config } from "@/config/wagmi";
import { Address } from "viem";

export interface GetMyStatsResponse {
  consecutiveDays: number;
  isBlacklisted: boolean;
  lastClaimed: bigint;
  totalClaimed: bigint;
}

// Write Contracts
export const checkIn = async () => {
  try {
    const result = await writeContract(config, {
      abi: checkinAbi,
      address: CHECK_IN_ADDRESS,
      functionName: "checkIn",
    });

    return result;
  } catch (error) {
    console.error("Error in checkIn", error);
    throw error;
  }
};

export const mintMyFirstSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: checkinAbi,
      address: CHECK_IN_ADDRESS,
      functionName: "mintMyFirstSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyFirstSBT", error);
    throw error;
  }
};

export const mintMyOneWeekSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: checkinAbi,
      address: CHECK_IN_ADDRESS,
      functionName: "mintMyOneWeekSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyOneWeekSBT", error);
    throw error;
  }
};

export const mintMyOneMonthSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: checkinAbi,
      address: CHECK_IN_ADDRESS,
      functionName: "mintMyOneMonthSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyOneMonthSBT", error);
    throw error;
  }
}


// Read Contracts
export const getMyStats = async (address: Address | undefined) => {
  try {
    console.log("Address", address);
    const result = (await readContract(config, {
      abi: checkinAbi,
      address: CHECK_IN_ADDRESS,
      functionName: "myCheckInStats",
      account: address,
    })) as GetMyStatsResponse;

    return result;
  } catch (error) {
    console.error("Error in getMyStats", error);
    throw error;
  }
};

