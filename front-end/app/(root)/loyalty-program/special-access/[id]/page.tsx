import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import { navigations } from "@/constants/common";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { getSpecialAccess } from "@/actions/access";
import { access } from "fs";
import SpecialAccessDetails from "@/components/views/SpecialAccessDetails";
export async function generateMetadata(
  { params, searchParams }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const access = await getSpecialAccess(params.id);
  if (access === false) {
    return {
      title: "Not Found",
      description: "Not Found",
    };
  }

  return {
    title: `SDQ | ${access.title}`,
    description: access.details,
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
      siteName: `SDQ | ${access.title}`,
      title: `SDQ | ${access.title}`,
      description: access.details,
      images: [
        {
          url: access.image,
          width: 1200,
          height: 630,
          alt: `${access.title}`,
        },
      ],
    },
  };
}
const SpecialAccessPage = async ({ params, searchParams }: URLProps) => {
  const access = (await getSpecialAccess(params.id)) as Access;

  const navs = [
    {
      label: "Special Access",
      href: "/loyalty-program/special-access",
    },
    {
      label: "Item Details",
      href: `/loyalty-program/special-access/${params.id}`,
    },
  ];
  return (
    <div className="flex flex-col w-full h-full items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb
          navigations={[navigations[0], navigations[2], ...navs]}
        />
      </div>

      <div className="flex flex-col space-y-6 w-full min-h-screen items-center justify-center bg-meteor-stars bg-no-repeat bg-cover">
        <SpecialAccessDetails access={JSON.parse(JSON.stringify(access))} />
      </div>
    </div>
  );
};

export default SpecialAccessPage;
