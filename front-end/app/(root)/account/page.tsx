import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import Account from "@/components/views/Account";
import { navigations } from "@/constants/common";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SDQ | My Account",
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
    siteName: "SDQ | My Account",
    title: "SDQ | My Account",
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

const AccountPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[5]]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <Account />
      </div>
    </div>
  );
};

export default AccountPage;
