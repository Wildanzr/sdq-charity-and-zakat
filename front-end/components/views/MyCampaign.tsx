"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "../shared/Blocker";
import Item from "../campaigns/Item";

interface MyCampaignProps {
  campaigns: MinimumCampaign[];
}

const MyCampaign = ({ campaigns }: MyCampaignProps) => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-5 w-full h-full min-h-screen items-start justify-start">
          <h2 className="m-heading text-neutral-base py-3 mb-0">
            My Campaigns
          </h2>
          {campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="m-body-base text-neutral-base">
                No campaigns found
              </p>
            </div>
          ) : (
            campaigns.map((item, idx) => (
              <Item
                key={idx}
                campaign={item}
                showCreator={false}
                customLink={`/my-campaigns/${item.id}`}
              />
            ))
          )}
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default MyCampaign;
