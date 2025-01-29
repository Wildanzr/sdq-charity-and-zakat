import { Address } from "viem";

// Global.d.ts
// Use for global type declaration

export { };

declare global {
  interface ChildrenProps {
    children: React.ReactNode;
  }

  interface URLProps {
    params: { id: string };
    searchParams: { [key: string]: string | undefined };
  }


  interface Navigation {
    label: string;
    href: string;
  }

  interface CheckIn {
    day: number;
    amount: number;
    image: string;
  }

  interface Product {
    image: string;
    label: string;
    description: string;
  }

  interface Soulbound {
    contract: Address;
    image: string;
    name: string;
    info: string;
    isObtained: boolean;
    isReadyToMint: boolean;
    requirement: number;
    id: number;
  }

  interface CampaignDetails {
    owner: `0x${string}`;
    title: string;
    details: string;
    target: bigint;
    donators: bigint;
    created: bigint;
    updated: bigint;
    paused: boolean;
    claimed: boolean;
  }

  interface CampaignDonations {
    address: `0x${string}`[];
    values: bigint[];
  }

  interface AvailableTokens {
    address: `0x${string}`[];
    coinIds: string[];
    decimals: number[];
    price: number[];
    icon: string[];
  }

  interface MinimumCampaign {
    id: number;
    owner: Address
    title: string;
    images: string[];
    description: string;
    target: number;
    raised: number;
    updated: Date;
    isPaused: boolean;
    isClaimed: boolean;
  }

  interface MaximumCampaign extends MinimumCampaign {
    details: string;
    pastMetadata: string;
  }

  interface TokenIcon {
    label: string;
    image: string;
  }

  interface TokenBalance {
    value: bigint;
    allowance: bigint;
    ticker: string;
  }

  interface Access {
    _id: string;
    title: string;
    image: string;
    price: number;
    total: number;
    sold: number;
    details: string;
    privateContent: string;
    claimers: string[];
    dueDate: Date;
  }

  interface Reward {
    _id: string;
    year: number;
    month: number;
    tasks: string[];
    winner: string[];
  }

  interface Ticket {
    _id: string;
    type: string;
    title: string;
    platform: string;
    link: string;
    points: number;
    finisher: string[];
  }

}
