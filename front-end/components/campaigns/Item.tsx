import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ImageCarousel from "@/components/shared/ImageCarousel";
import { Separator } from "../ui/separator";
import { formatterUSD, getTimestamp } from "@/lib/utils";
import Link from "next/link";
import Creator from "./Creator";

interface ItemProps {
  campaign: MinimumCampaign;
  showCreator?: boolean;
  customLink?: string;
}

const Item = ({ campaign, showCreator, customLink }: ItemProps) => {
  const percentage = Math.floor((campaign.raised / campaign.target) * 100);
  const lastUpdated = getTimestamp(campaign.updated);
  return (
    <Card className="w-full bg-secondary-100/50 rounded-2xl border-primary-90">
      <CardHeader className="flex flex-col space-y-3 p-4 w-full">
        <div className="flex relative h-60 w-full">
          <ImageCarousel imageSources={campaign.images} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3 w-full h-full">
          <p className="m-body-link text-neutral-base/50 mb-0">
            Last update: {lastUpdated}
          </p>
          <Link
            href={customLink || `/campaigns/${campaign.id}`}
            className="text-brand-60 m-heading"
          >
            {campaign.title}
          </Link>

          <Separator className="my-4 bg-primary-90" />

          <p className="text-neutral-base m-body-small line-clamp-3">
            {campaign.description}
          </p>
          <div className="w-full h-2 bg-primary-90 rounded-xl">
            <div
              className="h-full bg-brand-60 rounded-xl"
              style={{
                width: `${percentage}%`,
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full items-start justify-start space-y-1">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-neutral-base m-subheading">
            {formatterUSD.format(campaign.raised)}
          </p>
          <p className="text-neutral-base m-subheading">{percentage}%</p>
        </div>
        <p className="text-neutral-70 m-body-small">
          raised of {formatterUSD.format(campaign.target)}
        </p>
        {showCreator && (
          <>
            <Separator className="my-4 bg-primary-90" />
            <Creator address={campaign.owner} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Item;
