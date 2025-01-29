import { CHAIN_EXPLORERS } from "@/constants/common";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";
import { haqqMainnet, haqqTestedge2 } from "wagmi/chains";
import qs from 'query-string'


interface UrlQueryProps {
  params: string;
  key: string;
  value: string | null;
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isAlreadyClaimed = (lastClaimed: bigint) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const lastClaimedDay = Math.trunc((Number(lastClaimed) * 1000) / oneDay);
  const now = Math.trunc(Date.now() / oneDay);
  return lastClaimedDay === now;
};

export const getExplorerDetails = (chainId: number | undefined) => {
  if (chainId === undefined) return CHAIN_EXPLORERS[0];
  const blockExplorer = CHAIN_EXPLORERS.find((item) => {
    if (item.id === chainId) return item;
  });

  return blockExplorer || CHAIN_EXPLORERS[0];
};

export const formatterUSD = new Intl.NumberFormat("default", {
  style: "currency",
  currency: "USD",
});

export const truncateAddress = (address: string | undefined) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const countTotalRaised = (values: bigint[], prices: number[], decimals: number[]) => {

  let raised = 0;
  for (let i = 0; i < values.length; i++) {
    const value = Number(formatUnits(values[i], decimals[i])) * prices[i];
    raised += value;
  }

  return raised;
}

export const getExplorer = () => {
  const NETWORK = process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet";
  const explorer = NETWORK === "mainnet"
    ? haqqMainnet.blockExplorers.default
    : haqqTestedge2.blockExplorers.default;

  return explorer;
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export const getAddressFromRegex = (input: string) => {
  const ethAddressRegex = /0x[a-fA-F0-9]{40}/g;
  const addresses = input.match(ethAddressRegex);

  if (!addresses) return;
  return addresses[0];
}

export const getGCPCredentials = () => {
  // for Vercel, use environment variables
  return process.env.GCP_PRIVATE_KEY
    ? {
      credentials: {
        client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY,
      },
      projectId: process.env.GCP_PROJECT_ID,
    }
    // for local development, use gcloud CLI
    : {};
};

export const formUrlQuery = ({ key, params, value }: UrlQueryProps) => {
  const currentUrl = qs.parse(params)
  currentUrl[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  }, { skipNull: true })
}