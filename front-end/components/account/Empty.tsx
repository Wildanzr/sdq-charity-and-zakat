import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface EmptyProps {
  info: string;
  linkTitle: string;
  linkHref: string;
}

const Empty = ({ info, linkHref, linkTitle }: EmptyProps) => {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center">
      <p className="w-full text-neutral-base m-body-base text-center bg-primary-100 p-4 rounded-xl shadow-[0px_-2px_2px_0px_#13AE75]">
        {info}
      </p>
      <Link href={linkHref} passHref>
        <Button className="flex flex-row space-x-3 m-body-base text-neutral-base z-10 bg-primary-50/20 border-2 border-brand-70 rounded-xl">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default Empty;
