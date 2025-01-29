import { readContract, writeContract } from "@wagmi/core";
import { charityAbi } from "@/constants/abis/charity";
import { CHARITY_ADDRESS, CHARITY_FIRST_BLOCK } from "@/constants/common";
import { config } from "@/config/wagmi";
import { Address } from "viem";
import { publicClient } from "@/config/viem";
export interface CampaignCreatedEvent {
  campaignId: bigint;
  description: string;
  details: string;
  owner: Address;
  timestamp: bigint;
  title: string;
}

export interface CampaignDetails {
  owner: Address;
  title: string;
  details: string;
  target: bigint;
  donators: bigint;
  created: bigint;
  updated: bigint;
  paused: boolean;
  claimed: boolean;
}

export interface CampaignDonation {
  donor: Address;
  campaignId: bigint;
  amount: bigint;
  token: Address;
  name: string;
  message: string;
  timestamp: bigint;
  tx: string;
}

// Write Contracts
export const createCampaign = async (
  title: string,
  description: string,
  details: string,
  target: string,
) => {
  console.log("Title", title);
  console.log("Details", details);
  console.log("Target", target);
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "createCampaign",
      args: [title, description, details, BigInt(target)],
    });

    return result;
  } catch (error) {
    console.error("Error in createCampaign", error);
    throw error;
  }
}

export const donateNative = async (campaignId: number, name: string, message: string, amount: bigint) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "donate",
      args: [campaignId, name, message],
      value: amount,
    });

    return result;
  } catch (error) {
    console.error("Error in donateNative", error);
    throw error;
  }
}

export const donateToken = async (campaignId: number, name: string, message: string, amount: bigint, token: Address) => {
  console.log("Campaign ID", campaignId);
  console.log("Name", name);
  console.log("Message", message);
  console.log("Amount", amount);
  console.log("Token", token);
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "donateWithToken",
      args: [campaignId, amount, token, name, message],
    });

    return result;
  } catch (error) {
    console.error("Error in donateToken", error);
    throw error;
  }
}

export const pauseCampaign = async (id: number) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "pauseCampaign",
      args: [id],
    });

    return result;
  } catch (error) {
    console.error("Error in pauseCampaign", error);
    throw error;
  }
}

export const unPauseCampaign = async (id: number) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "unpauseCampaign",
      args: [id],
    });

    return result;
  } catch (error) {
    console.error("Error in unPauseCampaign", error);
    throw error;
  }
}

export const updateCampaign = async (id: number, title: string, details: string, target: string) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "updateCampaign",
      args: [id, title, details, BigInt(target)],
    });

    return result;
  } catch (error) {
    console.error("Error in updateCampaign", error);
    throw error;
  }
}

export const withdrawCampaign = async (id: number) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "withdrawCampaign",
      args: [id],
    });

    return result;
  } catch (error) {
    console.error("Error in withdrawCampaign", error);
    throw error;
  }
}

export const mintMyFirstDonationSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "mintMyFirstDonationSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyFirstDonationSBT", error);
    throw error;
  }
}

export const mintMyFifthDonationSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "mintMyFifthDonationSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyFifthDonationSBT", error);
    throw error;
  }
}

export const mintMyTenDonationSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "mintMyTenDonationSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyTenDonationSBT", error);
    throw error;
  }
}

export const mintMyFiftyDonationSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "mintMyFiftyDonationSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyFiftyDonationSBT", error);
    throw error;
  }
}


export const mintMyHundredDonationSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "mintMyHundredDonationSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyHundredDonationSBT", error);
    throw error;
  }
}

export const mintMyFirstCampaignSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "mintMyFirstCampaignSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyFirstCampaignSBT", error);
    throw error;
  }
}

export const mintMyThirdCampaignSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "mintMyThirdCampaignSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyThirdCampaignSBT", error);
    throw error;
  }
}

export const mintMyTenCampaignSBT = async (address: Address) => {
  try {
    const result = await writeContract(config, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "mintMyTenCampaignSBT",
      account: address,
    });

    return result;
  } catch (error) {
    console.error("Error in mintMyTenCampaignSBT", error);
    throw error;
  }
}

// Read Contracts
export const getCampaignDonationsLog = async (campaignId: number) => {
  try {

    const donations: CampaignDonation[] = [];
    const latestBlock = await publicClient.getBlockNumber();
    // TODO: Should optimize only get the logs for the specific campaignId
    const res = await publicClient.getContractEvents({
      address: CHARITY_ADDRESS,
      abi: charityAbi,
      eventName: "CampaignDonation",
      fromBlock: latestBlock - BigInt(10000),
      toBlock: "latest"
    })

    for (const event of res) {
      if (event.args.campaignId === BigInt(campaignId)) {
        donations.push({
          donor: event.args.donor!,
          campaignId: event.args.campaignId!,
          amount: event.args.amount!,
          token: event.args.token!,
          name: event.args.name!,
          message: event.args.message!,
          timestamp: event.args.timestamp!,
          tx: event.transactionHash,
        });
      }
    }

    return donations;
  } catch (error) {
    console.error("Error in getMyCampaigns", error);
    throw error;
  }
}
