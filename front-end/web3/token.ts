import { readContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { Address, parseEther } from "viem";
import { tokenAbi } from "@/constants/abis/token";
import { CHARITY_ADDRESS, SHODAQO_ADDRESS } from "@/constants/common";
import { writeContract } from "@wagmi/core";

// Write Contracts
export const approveSpending = async (token: Address) => {
  const maxAmount = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  try {
    const approve = await writeContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "approve",
      args: [CHARITY_ADDRESS, maxAmount]
    });

    return approve;
  } catch (error) {
    console.error("Error in approveSpending", error);
    throw error;
  }
};

export const tranferToBuyAccess = async (to: Address, amount: number) => {
  const parsedAmount = parseEther(amount.toString())
  console.log("Amount", parsedAmount)
  try {
    const tf = await writeContract(config, {
      abi: tokenAbi,
      address: SHODAQO_ADDRESS,
      functionName: "transfer",
      args: [to, parsedAmount]
    });

    return tf;
  } catch (error) {
    console.error("Error in approveSpending", error);
    throw error;
  }
}

// Read Contracts
export const getTokenBalance = async (token: Address, owner: Address, spender: Address) => {
  try {
    const balance = readContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "balanceOf",
      args: [owner]
    })

    const symbol = readContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "symbol",
      args: []
    })

    const allowance = readContract(config, {
      abi: tokenAbi,
      address: token,
      functionName: "allowance",
      args: [owner, spender]
    })

    const result = await Promise.all([balance, allowance, symbol]);

    return {
      value: result[0],
      allowance: result[1],
      ticker: result[2]
    } as TokenBalance;
  } catch (error) {
    console.error("Error in getMyStats", error);
    throw error;
  }
};
