import Item from "../campaigns/Item";

interface CampaignsProps {
  campaigns: MinimumCampaign[];
}

const Campaigns = ({ campaigns }: CampaignsProps) => {
  return (
    <div className="flex space-y-5 flex-col w-full h-full items-center justify-start py-3">
      <h2 className="text-neutral-base m-title-page text-center">
        Featured Campaigns
      </h2>
      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="m-body-base text-neutral-base">No campaigns found</p>
        </div>
      ) : (
        campaigns.map((item, idx) => (
          <Item key={idx} campaign={item} showCreator={true} />
        ))
      )}
    </div>
  );
};

export default Campaigns;
