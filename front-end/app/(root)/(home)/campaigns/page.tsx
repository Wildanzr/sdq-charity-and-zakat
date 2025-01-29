import {
  getNumberOfCampaigns,
  getPaginatedCampaignsIndex,
  paginateCampaigns,
} from "@/actions/readWeb3";
import CampaignPagination from "@/components/campaigns/CampaignPagination";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import Campaigns from "@/components/views/Campaigns";
import { navigations } from "@/constants/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SDQ | Featured Campaigns",
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
    siteName: "SDQ | Featured Campaigns",
    title: "SDQ | Featured Campaigns",
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

export default async function AllCampaignsPage({
  params,
  searchParams,
}: URLProps) {
  const page = searchParams.page ? +searchParams.page : 1;
  let limit = searchParams.limit ? +searchParams.limit : 10;
  if (limit > 10) limit = 10;
  const nums = await getPaginatedCampaignsIndex(page, limit);
  let currentMax =
    nums[nums.length - 1] === 1
      ? nums[nums.length - 1] + 1
      : nums[nums.length - 1];
  if (currentMax < limit) limit = currentMax;
  const [numberOfCampaigns, { campaigns }] = await Promise.all([
    getNumberOfCampaigns(),
    paginateCampaigns(page, limit),
  ]);
  const isNext = numberOfCampaigns > page * 10;

  const nav = {
    label: "All Campaigns",
    href: "/campaigns",
  };
  return (
    <div className="flex flex-col items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], nav]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
        <Campaigns campaigns={campaigns} />
        <CampaignPagination isNext={isNext} pageNumber={page} />
      </div>
    </div>
  );
}
