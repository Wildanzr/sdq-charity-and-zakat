import Image from "next/image";
import React from "react";
import Connect from "./Connect";

const Blocker = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full h-1/2 bg-secondary-100 border-[1px] border-primary-50 p-5 rounded-2xl">
      <Image src="/images/wallet.png" alt="wallet" width={100} height={100} />
      <div className="flex flex-col space-y-2">
        <h2 className="text-neutral-base m-body-strong text-center">
          Please connect your wallet
        </h2>
        <p className="text-neutral-60 m-body-link text-center">
          Connecting your wallet ensures a secure and seamless experience,
          allowing us to personalize your interactions and keep your data safe.
        </p>
      </div>

      <Connect />
    </div>
  );
};

export default Blocker;
