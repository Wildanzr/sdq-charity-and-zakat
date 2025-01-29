import {
  getMyCampaignIndex,
  getNumberOfCampaigns,
  paginateSomeCampaigns,
} from "@/actions/readWeb3";
import CampaignPagination from "@/components/campaigns/CampaignPagination";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import MyCampaign from "@/components/views/MyCampaign";
import { navigations } from "@/constants/common";
import { getAddressFromRegex } from "@/lib/utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";
import { Address } from "viem";

export const metadata: Metadata = {
  title: "SDQ | My Campaigns",
  description:
    "SDQ is a decentralized social network for charity and social good. It is built with Next.js, TypeScript, Tailwind CSS, and Vercel. It is also optimized for SEO and performance.",
  keywords: [
    "SDQ",
    "Social Good",
    "Charity",
    "Social Network",
    "Decentralized",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Vercel",
    "SEO",
    "Performance",
  ],
  authors: [
    {
      name: "Danzrrr",
      url: "https://wildanzr.my.id",
    },
  ],
  creator: "Danzrrr",
  publisher: "Danzrrr",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wildanzr.my.id",
    siteName: "SDQ | My Campaigns",
    title: "SDQ | My Campaigns",
    description:
      "SDQ is a decentralized social network for charity and social good. It is built with Next.js, TypeScript, Tailwind CSS, and Vercel. It is also optimized for SEO and performance.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/images/cover.jpg`,
        width: 1200,
        height: 630,
        alt: "SDQ | Social Good",
      },
    ],
  },
};

const MyCampaignPage = async ({ params, searchParams }: URLProps) => {
  const cookie = headers().get("cookie");
  const stringified = JSON.stringify(cookie);
  const address = getAddressFromRegex(stringified) as Address;
  const page = searchParams.page ? +searchParams.page : 1;
  let limit = searchParams.limit ? +searchParams.limit : 10;
  if (limit > 10) limit = 10;
  const nums = await getMyCampaignIndex(address, page, limit);
  let currentMax =
    nums[nums.length - 1] === 1
      ? nums[nums.length - 1] + 1
      : nums[nums.length - 1];
  if (currentMax < limit) limit = currentMax;

  const [numberOfCampaigns, { campaigns }] = await Promise.all([
    getNumberOfCampaigns(),
    paginateSomeCampaigns(nums),
  ]);
  const isNext = numberOfCampaigns > page * 10;

  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[4]]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <MyCampaign campaigns={campaigns} />
        <CampaignPagination isNext={isNext} pageNumber={page} />
      </div>
    </div>
  );
};

export default MyCampaignPage;
