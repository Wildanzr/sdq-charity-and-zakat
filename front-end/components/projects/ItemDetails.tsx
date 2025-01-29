import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { formatterUSD } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import ImageCarousel from "../shared/ImageCarousel";

interface ItemDetailsProps {
  title: string;
  description: string;
  raised: number;
  target: number;
  imageSources: string[];
}

const ItemDetails = ({
  description,
  imageSources,
  raised,
  target,
  title,
}: ItemDetailsProps) => {
  return (
    <Card className="w-full bg-secondary-100/50 rounded-2xl border-primary-90">
      <CardHeader className="flex flex-col space-y-3 p-4 w-full">
        <div className="flex relative h-60 w-full">
          <ImageCarousel imageSources={imageSources} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3 w-full h-full">
          <h2 className="text-neutral-base m-heading">{title}</h2>

          <Separator className="my-4 bg-primary-90" />

          <p className="text-neutral-base m-body-small line-clamp-3">
            {description}
          </p>
          <div className="w-full h-2 bg-primary-90 rounded-xl">
            <div className="w-2/5 h-full bg-brand-60 rounded-xl" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full items-start justify-start space-y-1">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-neutral-base m-subheading">
            {formatterUSD.format(raised)}
          </p>
          <p className="text-neutral-base m-subheading">40%</p>
        </div>
        <p className="text-neutral-70 m-body-small">
          raised of {formatterUSD.format(target)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ItemDetails;
