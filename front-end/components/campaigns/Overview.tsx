import React from "react";
import parse from "html-react-parser";

interface OverviewProps {
  content: string;
}

const Overview = ({ content }: OverviewProps) => {
  return (
    <div className="flex flex-col w-full h-full space-y-3 text-neutral-base m-body-base">
      <h2 className="text-neutral-base m-title-page text-start">
        Campaign Overview
      </h2>
      {parse(content)}
    </div>
  );
};

export default Overview;
