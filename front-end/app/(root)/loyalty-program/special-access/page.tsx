import {
  getAvailableSpecialAccess,
  getMySpecialAccess,
  getPassedSpecialAccess,
} from "@/actions/access";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import SpecialAccess from "@/components/views/SpecialAccess";
import { navigations } from "@/constants/common";
import { getAddressFromRegex } from "@/lib/utils";
import { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";
import { Address } from "viem";

export const metadata: Metadata = {
  title: "SDQ | Special Access",
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
    siteName: "SDQ | Special Access",
    title: "SDQ | Special Access",
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

const SpecialAccessPage = async () => {
  const cookie = headers().get("cookie");
  const stringified = JSON.stringify(cookie);
  const address = getAddressFromRegex(stringified) as Address;
  const ongoing = (await getAvailableSpecialAccess(address)) as Access[];
  const passed: Access[] = [];
  const mine = (await getMySpecialAccess(address)) as Access[];
  const nav = {
    label: "Special Access",
    href: "/loyalty-program/special-access",
  };
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[2], nav]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <SpecialAccess
          ongoing={JSON.parse(JSON.stringify(ongoing))}
          passed={JSON.parse(JSON.stringify(passed))}
          mine={JSON.parse(JSON.stringify(mine))}
        />
      </div>
    </div>
  );
};

export default SpecialAccessPage;
