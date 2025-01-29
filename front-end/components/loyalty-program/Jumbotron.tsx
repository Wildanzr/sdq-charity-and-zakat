import React from "react";
import Image from "next/image";
import { FaCaretRight } from "react-icons/fa6";

const Jumbotron = () => {
  return (
    <div className="flex flex-col min-h-screen items-start justify-start overflow-clip">
      <div className="flex relative flex-col w-full h-full space-y-5 p-5">
        <Image
          src="/images/charity-crypto.png"
          width={300}
          height={300}
          alt="Charity Crypto"
          className="absolute top-0 -right-12"
        />

        <div className="flex flex-col w-full min-h-screen h-full items-start justify-center space-y-3">
          <h1 className="text-neutral-base m-title-hero z-10">
            Unlock Exclusive Rewards with Our Loyalty Program
          </h1>
          <p className="text-neutral-base m-body-small z-10">
            Our Loyalty Program is designed to appreciate and reward your
            unwavering support. As a valued contributor, you can access unique
            benefits through our Ticket Raffle and Special Access programs.
            Discover how your generosity can bring you even closer to our
            mission
          </p>

          <div className="flex flex-col w-ful h-full items-center justify-center space-y-5 pt-20 z-10">
            <h1 className="text-neutral-base m-heading">
              Join Our Loyalty Program
            </h1>

            <div className="flex flex-col space-y-2 w-full h-full bg-primary-100 border border-primary-90 p-5 rounded-lg">
              <div className="flex flex-row space-x-2 items-center justify-start">
                <Image
                  src="/icons/access.svg"
                  width={30}
                  height={30}
                  alt="Special Access"
                />
                <p className="m-body-strong text-neutral-base">
                  Special Access
                </p>
              </div>
              <p className="m-body-small text-neutral-base">
                As a member of our Special Access program, you receive exclusive
                benefits designed to enhance your engagement with our cause
              </p>
              <div className="flex flex-row w-full space-x-2 items-center justify-start">
                <p className="m-body-link text-brand-50">Learn More</p>
                <FaCaretRight size={20} className="text-brand-50" />
              </div>
            </div>

            <div className="flex flex-col space-y-2 w-full h-full bg-primary-100 border border-primary-90 p-5 rounded-lg">
              <div className="flex flex-row space-x-2 items-center justify-start">
                <Image
                  src="/icons/ticket.svg"
                  width={30}
                  height={30}
                  alt="Ticket Raffle"
                />
                <p className="m-body-strong text-neutral-base">Ticket Raffle</p>
              </div>
              <p className="m-body-small text-neutral-base">
                Each month, we recognize our most dedicated donors through our
                Ticket Raffle. By participating in this program, you stand a
                chance to win exciting prizes from our ecosystem sponsors.
              </p>
              <div className="flex flex-row w-full space-x-2 items-center justify-start">
                <p className="m-body-link text-brand-50">Learn More</p>
                <FaCaretRight size={20} className="text-brand-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
