import { getTickets } from "@/actions/ticket";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import TicketRaffle from "@/components/views/TicketRaffle";
import { navigations } from "@/constants/common";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SDQ | Ticket Raffle",
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
    siteName: "SDQ | Ticket Raffle",
    title: "SDQ | Ticket Raffle",
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

const TicketRafflePage = async () => {
  const availableTickets: Ticket[] = await getTickets();
  const nav = {
    label: "Ticket Raffle",
    href: "/loyalty-program/ticket-raffle",
  };

  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], navigations[2], nav]} />
      </div>
      <div className="flex flex-col space-y-6 px-5 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <TicketRaffle tickets={availableTickets} />
      </div>
    </div>
  );
};

export default TicketRafflePage;
