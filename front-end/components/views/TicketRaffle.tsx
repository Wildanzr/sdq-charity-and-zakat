"use client";

import Blocker from "@/components/shared/Blocker";
import { useWalletStore } from "@/store/wallet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaInstagram, FaTwitter } from "react-icons/fa6";
import { raffleList } from "@/constants/common";
import MainTicket from "../ticket-raffle/MainTicket";
import { useAccount } from "wagmi";
import BaseTicket from "../ticket-raffle/BaseTicket";

interface TicketRaffleProps {
  tickets: Ticket[];
}

const TicketRaffle = ({ tickets }: TicketRaffleProps) => {
  const { isConnected } = useWalletStore((state) => ({
    isConnected: state.isConnected,
  }));
  const { address } = useAccount();

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col space-y-8 w-full h-full items-start justify-start min-h-screen">
          <div className="flex flex-col w-full h-full items-start justify-start space-y-5 p-5">
            <h1 className="m-heading text-neutral-base">
              Celebrating your loyalty
            </h1>
            <div className="grid grid-cols-2 gap-4 w-full h-full">
              {raffleList.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative h-32 rounded-lg items-center justify-center flex flex-col ${
                    idx === 0 ? "col-span-2" : ""
                  }`}
                >
                  <div
                    className={"absolute inset-0 rounded-lg object-center"}
                    style={{
                      backgroundImage: `url("${item.image}")`,
                      backgroundSize: "cover",
                      opacity: 0.5,
                      zIndex: 0,
                      backdropFilter: "blur(10px)",
                    }}
                  ></div>
                  <p className="m-body-strong text-neutral-base text-center z-10">
                    {item.label}
                  </p>
                  <p className="m-body-link text-neutral-base text-center z-10">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full h-full items-start justify-start mt-20 p-5 space-y-3">
            <h1 className="m-heading text-neutral-base">
              What is Ticket Raffle?
            </h1>
            <p className="m-body-base text-neutral-base">
              Ticket Raffle is a loyalty program designed to appreciate and
              reward your unwavering support for each month. As a valued
              contributor, you can access unique benefits through our Ticket
              Raffle and Special Access programs. Discover how your generosity
              can bring you even closer to our mission.
            </p>
          </div>

          <div className="flex flex-col w-full h-full items-start justify-start mt-20 p-5 space-y-3">
            <h1 className="m-heading text-neutral-base">How to participate?</h1>
            <p className="m-body-base text-neutral-base">
              Complete time-limited tasks from carefully selected list of
              projects to earn extra Blum Points
            </p>

            <div className="flex flex-col w-full h-full items-start justify-start pt-5 space-y-5">
              {tickets
                .filter((tickets) => tickets.type === "mandatory")
                .map((ticket, idx) => (
                  <MainTicket
                    key={idx}
                    title={ticket.title}
                    href={ticket.link}
                    address={address as string}
                    done={ticket.finisher.includes(address!)}
                    id={ticket._id}
                  />
                ))}
            </div>
          </div>

          <div className="flex flex-col w-full h-full items-start justify-start mt-20 p-5 space-y-3">
            <h1 className="m-heading text-neutral-base">SDQ Socials 1</h1>
            <p className="m-body-base text-neutral-base">
              Complete social tasks to earn more points
            </p>

            <div className="flex flex-col w-full h-full items-start justify-start pt-5 space-y-5">
              {tickets
                .filter((tickets) => tickets.type !== "mandatory")
                .map((item, idx) => (
                  <BaseTicket
                    key={idx}
                    address={address as string}
                    done={item.finisher.includes(address!)}
                    href={item.link}
                    id={item._id}
                    title={item.title}
                    platform={item.platform}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <Blocker />
      )}
    </>
  );
};

export default TicketRaffle;
