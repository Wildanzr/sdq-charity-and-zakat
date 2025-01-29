"use client";

import { useWalletStore } from "@/store/wallet";
import Blocker from "@/components/shared/Blocker";
import { useState } from "react";
import FormState, { States } from "@/components/create-a-campaign/FormState";
import { uploadImage } from "@/actions/bucket";
import { uploadToIPFS } from "@/actions/ipfs";
import FormUpdateCampaign from "../update-a-campaign/FormUpdateCampaign";

interface UpdateACampaignProps {
  campaign: MaximumCampaign;
}

const UpdateACampaign = ({ campaign }: UpdateACampaignProps) => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const [formStates, setFormStates] = useState<States>({
    isSubmitting: false,
    first: false,
    second: false,
    third: false,
  });

  const handleUploadImages = async (files: File[]) => {
    let images: string[] = [];
    if (files) {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return uploadImage(formData);
      });
      images = await Promise.all(uploadPromises);
    }
    setFormStates((prev) => ({ ...prev, first: true }));
    return images;
  };

  const handleUploadIPFS = async (content: string) => {
    const result = await uploadToIPFS(content);
    setFormStates((prev) => ({ ...prev, second: true }));
    return result;
  };

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full min-h-screen items-start justify-start">
          <FormUpdateCampaign
            handleUploadImages={handleUploadImages}
            handleUploadIPFS={handleUploadIPFS}
            formStates={formStates}
            setFormStates={setFormStates}
            campaign={campaign}
          >
            <FormState formStates={formStates} />
          </FormUpdateCampaign>
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default UpdateACampaign;
