import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Message from "../projects/Message";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { Address } from "viem";
import Image from "next/image";
import { Button } from "../ui/button";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Anonymous",
  },
];

export interface Donator {
  token: string;
  amount: string;
  name: string;
  message: string;
  tx: string;
}

interface DonorsProps {
  donators: Donator[];
}

const Donors = ({ donators }: DonorsProps) => {
  return (
    <div className="flex flex-col w-full h-full text-neutral-base">
      <h2 className="m-title-page text-start">Donors</h2>
      <Table className="overflow-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Currency</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Message</TableHead>
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
                <TableCell className="font-medium">
                  <Image src={item.token} width={20} height={20} alt="Token" />
                </TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
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
  );
};

export default Donors;
