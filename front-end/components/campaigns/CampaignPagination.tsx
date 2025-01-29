"use client";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

interface PaginationProps {
  pageNumber: number;
  isNext: boolean;
}

const CampaignPagination = ({ isNext, pageNumber }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNUmber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUlr = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNUmber.toString(),
    });

    router.push(newUlr);
  };

  if (!isNext && pageNumber === 1) return null;
  return (
    <Pagination className="text-neutral-base">
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={pageNumber === 1}
            onClick={() => handleNavigation("prev")}
            className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl py-2 px-4"
          >
            Prev
          </Button>
        </PaginationItem>
        <PaginationItem>
          <p className="m-body-strong px-4">{pageNumber}</p>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={!isNext}
            onClick={() => handleNavigation("next")}
            className="flex flex-row space-x-3 text-neutral-base z-10 bg-primary-60 border-2 border-brand-70 rounded-xl py-2 px-4"
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CampaignPagination;
