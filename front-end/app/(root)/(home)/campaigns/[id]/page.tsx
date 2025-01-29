import {
  getAvailableTokens,
  getMaximumCampaignDetails,
  getMinimumCampaignDetails,
  getNumberOfCampaigns,
} from "@/actions/readWeb3";
import Creator from "@/components/campaigns/Creator";
import DonateDialog from "@/components/campaigns/DonateDialog";
import Donator from "@/components/campaigns/Donator";
import Item from "@/components/campaigns/Item";
import Overview from "@/components/campaigns/Overview";
import NavBreadcrumb from "@/components/shared/NavBreadcrumb";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { navigations } from "@/constants/common";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaFacebook, FaTelegram, FaTwitter } from "react-icons/fa6";
import { PiShareFatThin } from "react-icons/pi";

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

  const campaign = (await getMinimumCampaignDetails(page)) as MinimumCampaign;

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

export default async function CampaignDetailsPage({
  params,
  searchParams,
}: URLProps) {
  const isValidId = !isNaN(Number(params.id));
  const page = params.id ? +params.id : 1;
  const numberOfCampaigns = await getNumberOfCampaigns();
  const isPageOutOfRange = page > numberOfCampaigns;

  const campaign = await getMaximumCampaignDetails(page);
  if (campaign === false) {
    return redirect("/not-found");
  }
  const availableTokens = (await getAvailableTokens()) as AvailableTokens;
  const navs = [
    {
      label: "All Campaigns",
      href: "/campaigns",
    },
    {
      label: searchParams.title || params.id,
      href: `/campaigns/${params.id}?title=${searchParams.title}`,
    },
  ];
  return (
    <div className="flex flex-col items-start justify-start space-y-5">
      <div className="flex flex-col px-5 w-full items-start justify-start">
        <NavBreadcrumb navigations={[navigations[0], ...navs]} />
      </div>
      <div className="flex flex-col space-y-6 p-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
        <Item campaign={campaign} />
        <div className="flex flex-row w-full space-x-5 h-full items-center justify-between">
          <Popover>
            <PopoverTrigger>
              <Button
                className="border border-brand-base rounded-lg bg-primary-100"
                asChild
              >
                <div className="flex">
                  <PiShareFatThin className="text-brand-base" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex max-w-36 flex-row items-start space-x-3 justify-start bg-primary-100 border border-brand-base rounded-lg">
              <Link
                target="_blank"
                href={`https://twitter.com/share?text=${encodeURI(
                  campaign.description
                )}&url=${process.env.NEXT_PUBLIC_URL}/campaigns/${
                  campaign.id
                }?utm_source=twitter&utm_medium=post`}
              >
                <FaTwitter className="text-brand-base" size={30} />
              </Link>
              <Link
                target="_blank"
                href={`https://www.facebook.com/sharer.php?title=${encodeURI(
                  campaign.description
                )}&u=${process.env.NEXT_PUBLIC_URL}/campaigns/${
                  campaign.id
                }?utm_source=facebook&utm_medium=post`}
              >
                <FaFacebook className="text-brand-base" size={30} />
              </Link>
              <Link
                target="_blank"
                href={`https://t.me/share/url?text=${encodeURI(
                  campaign.description
                )}&url=${process.env.NEXT_PUBLIC_URL}/campaigns/${
                  campaign.id
                }?utm_source=telegram&utm_medium=message`}
              >
                <FaTelegram className="text-brand-base" size={30} />
              </Link>
            </PopoverContent>
          </Popover>

          <DonateDialog
            id={campaign.id}
            title={campaign.title}
            paused={campaign.isPaused}
            claimed={campaign.isClaimed}
          />
        </div>
        <div className="flex flex-col w-full h-full">
          <h2 className="text-neutral-base m-title-page text-start">Creator</h2>
          <Creator address={campaign.owner} verified={true} />
        </div>
        <Overview content={campaign.details} />
        <Donator id={campaign.id} availableTokens={availableTokens} />
      </div>
    </div>
  );
}
