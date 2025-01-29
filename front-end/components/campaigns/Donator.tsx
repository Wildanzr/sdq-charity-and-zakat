"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Message from "../projects/Message";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { getCampaignDonationsLog } from "@/web3/charity";
import React, { useCallback, useEffect, useState } from "react";
import Loader from "../shared/Loader";
import { getExplorer } from "@/lib/utils";
import { formatUnits } from "viem";
import { tokenIcon } from "@/constants/common";

interface Donator {
  token: string;
  amount: string;
  name: string;
  message: string;
  tx: string;
}

interface DonatorProps {
  id: number;
  availableTokens: AvailableTokens;
}

const Donator = ({ id, availableTokens }: DonatorProps) => {
  const [donators, setDonators] = useState<Donator[] | undefined>([]);
  const etherscan = getExplorer();
  const fetchDonators = useCallback(async () => {
    const result = await getCampaignDonationsLog(id);
    const donators: Donator[] = [];
    for (const item of result) {
      const index = availableTokens.address.findIndex(
        (token) => token === item.token
      );
      if (index === -1) {
        donators.push({
          token: tokenIcon[0].image,
          amount: formatUnits(item.amount, 18),
          message: item.message,
          name: item.name,
          tx: `${etherscan.url}/tx/${item.tx}`,
        });
      } else {
        donators.push({
          token: availableTokens.icon[index],
          amount: formatUnits(item.amount, availableTokens.decimals[index]),
          message: item.message,
          name: item.name,
          tx: `${etherscan.url}/tx/${item.tx}`,
        });
      }
    }
    donators.reverse();
    setDonators(donators);
  }, [
    availableTokens.address,
    availableTokens.decimals,
    availableTokens.icon,
    etherscan.url,
    id,
  ]);

  useEffect(() => {
    if (id) {
      fetchDonators();
    }
  }, [fetchDonators, id]);

  return (
    <div className="flex flex-col w-full h-full">
      {donators === undefined ? (
        <div className="flex items-center justify-center w-full ">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full text-neutral-base">
          <h2 className="m-title-page text-start">Donors</h2>
          <Table className="overflow-scroll">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Currency</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Message</TableHead>
                <TableHead className="text-right">Tx</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donators.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <p className="m-body-base text-neutral-base">
                      Be the first to donate 💖
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                donators.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="flex items-center justify-center">
                      <Image
                        src={item.token}
                        width={20}
                        height={20}
                        alt="Token"
                        className="rounded-full"
                      />
                    </TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell className="text-center">
                      {item.name === "" ? "Anonymous" : item.name}
                    </TableCell>
                    <TableCell className="text-center p-0 m-0">
                      {item.message && (
                        <Message from={item.name} message={item.message} />
                      )}
                    </TableCell>
                    <TableCell className="flex items-center justify-end">
                      <Link href={item.tx} target="_blank">
                        <FaExternalLinkAlt
                          className="text-neutral-base cursor-pointer"
                          size={20}
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Donator;
