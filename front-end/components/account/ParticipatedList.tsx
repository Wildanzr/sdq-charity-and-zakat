import React from "react";
import Empty from "./Empty";

const ParticipatedList = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <h2 className="text-neutral-base m-subheading">Participated Campaigns</h2>

      <Empty
        info="You have not participated in any campaign yet."
        linkHref="/campaigns"
        linkTitle="Participate Now"
      />
    </div>
  );
};

export default ParticipatedList;
