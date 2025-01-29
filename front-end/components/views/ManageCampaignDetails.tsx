"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import Item from "../campaigns/Item";
import Overview from "../campaigns/Overview";
import Donator from "../campaigns/Donator";
import Management from "../campaigns/Management";
import { useState } from "react";

interface ManageCampaignDetailsProps {
  campaign: MaximumCampaign;
  availableTokens: AvailableTokens;
}

const ManageCampaignDetails = ({
  campaign,
  availableTokens,
}: ManageCampaignDetailsProps) => {
  const [paused, setPaused] = useState(campaign.isPaused);
  const [claimed, setClaimed] = useState(campaign.isClaimed);
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-6 p-5 w-full min-h-screen items-start justify-start bg-meteor-stars bg-no-repeat bg-cover">
          <Item
            campaign={campaign}
            showCreator={false}
            customLink={`/my-campaigns/${campaign.id}`}
          />
          <Management
            id={campaign.id}
            paused={paused}
            setPaused={setPaused}
            claimed={claimed}
            setClaimed={setClaimed}
          />
          <Overview content={campaign.details} />
          <Donator id={campaign.id} availableTokens={availableTokens} />
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default ManageCampaignDetails;
