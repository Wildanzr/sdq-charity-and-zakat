"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { finishTicket } from "@/actions/ticket";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { FaCheck } from "react-icons/fa6";

interface MainTicketProps {
  title: string;
  href: string;
  id: string;
  address: string;
  done: boolean;
}

const MainTicket = ({ title, href, id, address, done }: MainTicketProps) => {
  const image = title.includes("NFT") ? "/icons/nft.png" : "/icons/checkin.png";
  const router = useRouter();
  const [disabledButton, setDisabledButton] = useState(false);

  const handleFinishing = async () => {
    console.log(id, address);
    setTimeout(() => {
      finishTicket(id, address);
      router.refresh();
    }, 50000);
  };

  return (
    <div className="flex flex-row w-full h-full items-start justify-between">
      <div className="flex flex-row space-x-3 items-center justify-start w-full h-full">
        <Image
          src={image}
          width={40}
          height={40}
          alt="mandatory"
          className="rounded-full"
        />
        <p className="m-body-base text-neutral-base">{title}</p>
      </div>

      <Button onClick={handleFinishing} disabled={disabledButton || done}>
        {disabledButton ? (
          <Loader size="20" />
        ) : done ? (
          <FaCheck size={20} className="text-brand-base" />
        ) : (
          "Start"
        )}
      </Button>
    </div>
  );
};

export default MainTicket;
