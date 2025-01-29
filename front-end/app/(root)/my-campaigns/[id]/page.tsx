import {
  getAvailableTokens,
  getMaximumCampaignDetails,
  getNumberOfCampaigns,
} from "@/actions/readWeb3";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import ManageCampaignDetails from "@/components/views/ManageCampaignDetails";
import { navigations } from "@/constants/common";
import { getAddressFromRegex } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Address } from "viem";

export async function generateMetadata(
  { params, searchParams }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const isValidId = !isNaN(Number(params.id));
  const page = params.id ? +params.id : 1;
  const numberOfCampaigns = await getNumberOfCampaigns();
  const isPageOutOfRange = page > numberOfCampaigns;
  if (!isValidId || isPageOutOfRange) {
    return {
      title: "Not Found",
      description: "Not Found",
    };
  }

  const campaign = (await getMaximumCampaignDetails(page)) as MaximumCampaign;
  return {
    title: `SDQ | ${campaign.title}`,
    description: campaign.description,
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
      siteName: `SDQ | ${campaign.title}`,
      title: `SDQ | ${campaign.title}`,
      description: campaign.description,
      images: [
        {
          url: campaign.images[0],
          width: 1200,
          height: 630,
          alt: `${campaign.title}`,
        },
      ],
    },
  };
}

const ManageCampaignPage = async ({ params, searchParams }: URLProps) => {
  const isValidId = !isNaN(Number(params.id));
  const page = params.id ? +params.id : 1;
  const numberOfCampaigns = await getNumberOfCampaigns();
  const isPageOutOfRange = page > numberOfCampaigns;
  const cookie = headers().get("cookie");
  const stringified = JSON.stringify(cookie);
  const address = getAddressFromRegex(stringified) as Address;
  const campaign = await getMaximumCampaignDetails(page);
  if (campaign === false) {
    return redirect("/not-found");
  }
  const availableTokens = (await getAvailableTokens()) as AvailableTokens;
  if (campaign.owner !== address) {
    return redirect("/not-found");
  }

  const path = {
    label: params.id,
    href: `/my-campaigns/${params.id}`,
  };
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[4], path]} />
      </div>
      <div className="flex flex-col space-y-6 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <ManageCampaignDetails
          campaign={campaign}
          availableTokens={availableTokens}
        />
      </div>
    </div>
  );
};

export default ManageCampaignPage;
