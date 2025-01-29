"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { finishTicket } from "@/actions/ticket";
import Loader from "../shared/Loader";
import { FaCheck } from "react-icons/fa6";
import { FaInstagram, FaTwitter } from "react-icons/fa6";

interface MainTicketProps {
  id: string;
  title: string;
  href: string;
  address: string;
  done: boolean;
  platform: string;
}

const BaseTicket = ({
  title,
  href,
  address,
  id,
  done,
  platform,
}: MainTicketProps) => {
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
        {platform === "Twitter" ? (
          <FaTwitter size={40} className="rounded-full text-brand-base" />
        ) : (
          <FaInstagram size={40} className="rounded-full text-brand-base" />
        )}
        <p className="m-body-base text-neutral-base">{title}</p>
      </div>

      <Button onClick={handleFinishing} disabled={disabledButton || done}>
        <Link href={href} target="_blank" passHref>
          {disabledButton ? (
            <Loader size="20" />
          ) : done ? (
            <FaCheck size={20} className="text-brand-base" />
          ) : (
            "Start"
          )}
        </Link>
      </Button>
    </div>
  );
};

export default BaseTicket;
