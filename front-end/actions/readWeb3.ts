"use server";

import { charityAbi } from "@/constants/abis/charity";
import { CHARITY_ADDRESS, tokenIcon } from "@/constants/common";
import { readContract } from "@wagmi/core";
import { getFromIPFS, IPFSResponse } from "./ipfs";
import { getCoinLatestPrice } from "./coingecko";
import { countTotalRaised } from "@/lib/utils";
import { serverConfig } from "@/config/server";
import { Address, isAddress } from "viem";
import { soulboundAbi } from "@/constants/abis/soulbound";

export const getNumberOfCampaigns = async () => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "numberOfCampaigns",
      args: [],
    });

    return result;
  } catch (error) {
    console.error("Error in getNumberOfCampaigns", error);
    throw false;
  }
}

export const getCampaignDetails = async (id: number) => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getCampaignDetails",
      args: [id],
    });

    return result as CampaignDetails;
  } catch (error) {
    console.error("Error in getCampaignDetails", error);
    return false;
  }
}

export const getCampaignDonations = async (id: number) => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getCampaignDonations",
      args: [id]
    })
    const donations: CampaignDonations = {
      address: result[0] as `0x${string}`[],
      values: result[1] as bigint[]
    }

    return donations;
  } catch (error) {
    console.error("Error in getCampaignDonations", error);
    return false;
  }
}

export const getAvailableTokens = async () => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getAvailableTokens",
      args: [],
    });
    const availableTokens: AvailableTokens = {
      address: result[0] as `0x${string}`[],
      coinIds: result[1] as string[],
      decimals: result[2] as number[],
      price: [],
      icon: result[1].map(label => tokenIcon.find(item => item.label === label)?.image || tokenIcon[0].image),
    }

    const prices: number[] = [];
    const latestPrice = await Promise.all(availableTokens.coinIds.map((item) => getCoinLatestPrice(item)));
    latestPrice.forEach((price, idx) => {
      prices.push(price);
    });
    availableTokens.price = prices;

    return availableTokens;
  } catch (error) {
    console.error("Error in getAvailableTokens", error);
    return false;
  }
}

export const paginateCampaigns = async (page: number, limit: number) => {
  try {
    const numberOfCampaigns = await getNumberOfCampaigns();
    const campaigns: MinimumCampaign[] = [];
    const end = (page * limit) + 1;
    const start = page * limit - limit === 0
      ? 1
      : page * limit - limit;

    const tokens = await getAvailableTokens() as AvailableTokens;
    const islm = await getCoinLatestPrice("islamic-coin");
    tokens.decimals.push(18);
    tokens.price.push(islm);

    const campaignPromises = [];
    for (let i = start; i < end; i++) {
      if (i > numberOfCampaigns) {
        break;
      }
      const item = Promise.all([
        getCampaignDetails(i),
        getCampaignDonations(i),
      ]) as Promise<[CampaignDetails, CampaignDonations]>;
      campaignPromises.push(item);
    }

    const results = await Promise.all(campaignPromises);
    const ipfsPromises: Promise<IPFSResponse>[] = [];
    for (const [details] of results) {
      if (!details) {
        break;
      }
      ipfsPromises.push(getFromIPFS(details.details));
    }
    const ipfsResults = await Promise.all(ipfsPromises);

    for (let i = 0; i < results.length; i++) {
      const [details, donations] = results[i];
      if (!details || !donations) {
        break;
      }
      campaigns.push({
        id: i + start,
        owner: details.owner,
        description: ipfsResults[i].description,
        images: ipfsResults[i].images,
        title: ipfsResults[i].title,
        target: Number(details.target),
        raised: countTotalRaised(donations.values, tokens.price, tokens.decimals),
        updated: new Date(Number(details.updated) * 1000),
        isPaused: details.paused,
        isClaimed: details.claimed,
      })
    }

    return { campaigns };
  } catch (error) {
    console.error("Error in paginateCampaigns", error);
    throw error;
  }
}

export const paginateSomeCampaigns = async (ids: number[]) => {
  try {
    const numberOfCampaigns = await getNumberOfCampaigns();
    const campaigns: MinimumCampaign[] = [];

    const tokens = await getAvailableTokens() as AvailableTokens;
    const islm = await getCoinLatestPrice("islamic-coin");
    tokens.decimals.push(18);
    tokens.price.push(islm);
    for (let i = 0; i < ids.length; i++) {
      if (i > numberOfCampaigns) {
        break;
      }
      const [details, donations] = await Promise.all([
        getCampaignDetails(ids[i]),
        getCampaignDonations(ids[i]),
      ]) as [CampaignDetails, CampaignDonations];
      if (!details || !donations) {
        break;
      }

      const ipfs = await getFromIPFS(details.details);
      campaigns.push({
        id: ids[i],
        owner: details.owner,
        description: ipfs.description,
        images: ipfs.images,
        title: ipfs.title,
        target: Number(details.target),
        raised: countTotalRaised(donations.values, tokens.price, tokens.decimals),
        updated: new Date(Number(details.updated) * 1000),
        isPaused: details.paused,
        isClaimed: details.claimed,
      })
    }

    return { campaigns };
  } catch (error) {
    console.error("Error in paginateCampaigns", error);
    throw error;
  }
}

export const getMinimumCampaignDetails = async (id: number) => {
  try {
    let [details, donations] = await Promise.all([
      getCampaignDetails(id),
      getCampaignDonations(id),
    ]) as [CampaignDetails, CampaignDonations];

    if (!details || !donations) {
      return false;
    }
    const [ipfs, tokens, islm] = await Promise.all([
      getFromIPFS(details.details),
      getAvailableTokens(),
      getCoinLatestPrice("islamic-coin"),
    ]) as [IPFSResponse, AvailableTokens, number];

    tokens.decimals.push(18);
    tokens.price.push(islm);

    const campaign: MinimumCampaign = {
      id,
      owner: details.owner,
      description: ipfs.description,
      images: ipfs.images,
      title: ipfs.title,
      raised: countTotalRaised(donations.values, tokens.price, tokens.decimals),
      target: Number(details.target),
      updated: new Date(Number(details.updated) * 1000),
      isPaused: details.paused,
      isClaimed: details.claimed,
    }

    return campaign;
  } catch (error) {
    console.error("Error in getMinimumCampaignDetails", error);
    return false;
  }
}

export const getMaximumCampaignDetails = async (id: number) => {
  try {
    let [details, donations] = await Promise.all([
      getCampaignDetails(id),
      getCampaignDonations(id),
    ]) as [CampaignDetails, CampaignDonations];

    if (!details || !donations) {
      return false;
    }
    const [ipfs, tokens, islm] = await Promise.all([
      getFromIPFS(details.details),
      getAvailableTokens(),
      getCoinLatestPrice("islamic-coin"),
    ]) as [IPFSResponse, AvailableTokens, number];

    tokens.decimals.push(18);
    tokens.price.push(islm);

    const campaign: MaximumCampaign = {
      id,
      owner: details.owner,
      description: ipfs.description,
      details: ipfs.details,
      images: ipfs.images,
      title: ipfs.title,
      raised: countTotalRaised(donations.values, tokens.price, tokens.decimals),
      target: Number(details.target),
      updated: new Date(Number(details.updated) * 1000),
      isPaused: details.paused,
      isClaimed: details.claimed,
      pastMetadata: details.details
    }

    return campaign;
  } catch (error) {
    console.error("Error in getMaximumCapaignDetails", error);
    return false;
  }
}

export const getPaginatedCampaignsIndex = async (page: number, limit: number) => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getPaginatedCampaignsIndex",
      args: [page, limit],
    })

    const filtered = result.filter((item: number) => item !== 0);
    return filtered;
  } catch (error) {
    console.error("Error in getPaginatedCampaignsIndex", error);
    throw error;
  }
}

export const getMyCampaignIndex = async (address: Address, page: number, limit: number) => {
  const isValidAddress = isAddress(address);
  if (!isValidAddress) {
    return [];
  }

  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "getMyCampaignIndex",
      args: [page, limit],
      account: address,
    });

    const filtered = result.filter((item: number) => item !== 0);
    return filtered;
  } catch (error) {
    console.error("Error in getMyCampaignIndex", error);
    throw error;
  }
}

export const soulboundBalaceOf = async (tokenAddr: Address, owner: Address) => {
  try {
    const result = await readContract(serverConfig, {
      abi: soulboundAbi,
      address: tokenAddr,
      functionName: "balanceOf",
      args: [owner],
    })

    return Number(result);
  } catch (error) {
    console.error("Error in soulboundBalaceOf", error);
    throw error;
  }
}

export const getCampaignCount = async (address: Address) => {
  try {
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "campaignCount",
      args: [address],
    })

    return Number(result);
  } catch (error) {
    console.error("Error in campaignCount", error);
    throw error
  }
}

export const getDonationCount = async (address: Address) => {
  try {
    console.log("reading", address);
    const result = await readContract(serverConfig, {
      abi: charityAbi,
      address: CHARITY_ADDRESS,
      functionName: "donationCount",
      args: [address],
    })

    console.log("result", result);

    return Number(result);
  } catch (error) {
    console.error("Error in donationCount", error);
    throw error
  }
}